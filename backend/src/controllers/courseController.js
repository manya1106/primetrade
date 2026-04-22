import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

// @desc    Get all courses
// @route   GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('mentorId', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course (Mentor only)
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, thumbnail } = req.body;
    const course = new Course({
      title,
      description,
      category,
      thumbnail,
      mentorId: req.user._id // Taken from authMiddleware
    });
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add lesson to course
// @route   POST /api/courses/:courseId/lessons
export const addLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, order } = req.body;
    const lesson = new Lesson({
      courseId: req.params.courseId,
      title,
      content,
      videoUrl,
      order
    });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
export const deleteAnyCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Lesson.deleteMany({ courseId: req.params.id });
    await course.deleteOne();

    res.json({ message: 'Course and associated lessons deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};