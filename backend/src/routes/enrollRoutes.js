import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { enrollInCourse, updateProgress } from '../controllers/enrollController.js';

// All enrollment routes require being logged in
router.use(protect);

// Student only: Mark a lesson as completed
// NOTE: This must come BEFORE /:courseId to avoid route conflict
router.patch('/progress/:courseId', authorizeRoles('student'), updateProgress);

// Student only: Enroll in a specific course
router.post('/:courseId', authorizeRoles('student'), enrollInCourse);

export default router;