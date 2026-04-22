import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import courseController from '../controllers/courseController.js';

// Public route
router.get('/', courseController.getCourses);

// Protected mentor/admin route
router.post(
  '/', 
  protect, 
  authorizeRoles('mentor', 'admin'), 
  courseController.createCourse
);

// Admin only route
router.delete(
  '/:id', 
  protect, 
  authorizeRoles('admin'), 
  courseController.deleteAnyCourse
);

export default router;