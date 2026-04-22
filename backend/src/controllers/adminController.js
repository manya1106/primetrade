import User from '../models/User.js';

// @desc    Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Change user role
export const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
};