const express = require('express');
const router = express.Router();
const {
    getEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
} = require('../controllers/equipmentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getEquipment).post(protect, upload.single('image'), createEquipment);
router
    .route('/:id')
    .get(getEquipmentById)
    .put(protect, updateEquipment)
    .delete(protect, deleteEquipment);

module.exports = router;
