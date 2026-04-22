import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

// Public: Register a new user
router.post('/register', registerUser);

// Public: Login and get token
router.post('/login', loginUser);

// Private: Get current logged-in user profile
router.get('/me', protect, async (req, res) => {
  // req.user is populated by the protect middleware
  res.json(req.user);
});

export default router;