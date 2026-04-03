const express = require("express");
const router = express.Router();
const {
  getStats,
  adminLogin,
  getAllUsers,
  getAllEquipment,
  updateEquipmentStatus,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/login", adminLogin);
router.get("/stats", protect, admin, getStats);
router.get("/users", protect, admin, getAllUsers);
router.get("/equipment", protect, admin, getAllEquipment);
router.put("/equipment/:id", protect, admin, updateEquipmentStatus);
router.get("/bookings", protect, admin, getAllBookings);
router.put("/bookings/:id", protect, admin, updateBookingStatus);

module.exports = router;
