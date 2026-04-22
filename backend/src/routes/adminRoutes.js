import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getAllUsers, updateUserRole, deleteUser } from '../controllers/adminController.js';

// Lock all routes in this file to Admin only
router.use(protect);
router.use(authorizeRoles('admin'));

// Admin: Get list of all users
router.get('/users', getAllUsers);

// Admin: Change a user's role (Promote/Demote)
router.patch('/role/:id', updateUserRole);

// Admin: Remove a user from the platform
router.delete('/users/:id', deleteUser);

export default router;