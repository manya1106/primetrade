import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import * as courseController from '../controllers/courseController.js';

// Public route
router.get('/', courseController.getCourses);

// Protected mentor/admin route
router.post(
  '/', 
  protect, 
  authorizeRoles('mentor', 'admin'), 
  courseController.createCourse
);

// Add lesson to a course
router.post(
  '/:courseId/lessons',
  protect,
  authorizeRoles('mentor', 'admin'),
  courseController.addLesson
);

// Admin only route
router.delete(
  '/:id', 
  protect, 
  authorizeRoles('admin'), 
  courseController.deleteAnyCourse
);

export default router;