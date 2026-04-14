const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Equipment = require('./models/Equipment');
const fs = require('fs');
const path = require('path');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear old data
        await User.deleteMany({});
        await Equipment.deleteMany({});
        console.log('Old Data Removed');

        // Create Farmer
        const farmer = await User.create({
            name: 'John Farmer',
            email: 'farmer@example.com',
            password: 'farmer123',
            role: 'farmer',
            location: 'Pune, Maharashtra'
        });

        console.log('Farmer Created');

        // Read JSON file
        const dataPath = path.join(__dirname, 'data', 'mock.json');
        const equipments = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Attach owner to each equipment
        const equipmentWithOwner = equipments.map(item => ({
            ...item,
            owner: farmer._id
        }));

        await Equipment.insertMany(equipmentWithOwner);

        console.log('25 Equipment Seeded Successfully ✅');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();