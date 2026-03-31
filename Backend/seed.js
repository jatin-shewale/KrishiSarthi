const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Equipment = require('./models/Equipment');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await User.deleteMany({ email: { $ne: process.env.ADMIN_USERNAME + '@admin.com' } }); // Keep admin if possible, but let's just clear for safety or use a specific filter
        await Equipment.deleteMany({});

        console.log('Data Cleared...');

        // Create Mock Farmer
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('farmer123', salt);

        const farmer = await User.create({
            name: 'John Farmer',
            email: 'farmer@example.com',
            password: 'farmer123', // hooks will hash it
            role: 'farmer',
            location: 'Pune, Maharashtra'
        });

        console.log('Mock Farmer Created...');

        const mockEquipment = [
            {
                name: 'Mahindra 575 DI Tractor',
                category: 'Tractor',
                price: 1200,
                location: 'Pune, MH',
                description: 'Powerful 45 HP engine, perfect for all soil types. Well-maintained.',
                image: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'approved'
            },
            {
                name: 'Sonalika Rotavator 6ft',
                category: 'Other',
                price: 500,
                location: 'Nashik, MH',
                description: 'Heavy duty rotavator for efficient soil preparation.',
                image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'approved'
            },
            {
                name: 'John Deere Harvester',
                category: 'Harvester',
                price: 5000,
                location: 'Nagpur, MH',
                description: 'High capacity harvester for wheat and rice crops.',
                image: 'https://images.unsplash.com/photo-1530268576402-3837946fb052?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'approved'
            },
            {
                name: 'Precision Seeder Machine',
                category: 'Seeder',
                price: 800,
                location: 'Satara, MH',
                description: 'Modern seeder for accurate seed placement and spacing.',
                image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'pending'
            },
            {
                name: 'Automated Sprayer 200L',
                category: 'Sprayer',
                price: 400,
                location: 'Solapur, MH',
                description: 'Efficient sprayer for pesticides and fertilizers.',
                image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'approved'
            },
            {
                name: 'Manual Power Tiller',
                category: 'Tiller',
                price: 600,
                location: 'Jalgaon, MH',
                description: 'Compact power tiller for small to medium farms.',
                image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800',
                owner: farmer._id,
                status: 'approved'
            }
        ];

        await Equipment.insertMany(mockEquipment);
        console.log('Mock Equipment Seeded...');

        console.log('Seeding Completed Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
