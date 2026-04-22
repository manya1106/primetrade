import Course from '../models/Course';
import Lesson from '../models/Lesson';

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('mentorId', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course (Mentor only)
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
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
// @route   POST /api/lessons/:courseId
exports.addLesson = async (req, res) => {
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