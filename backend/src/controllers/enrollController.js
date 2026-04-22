import Enrollment from '../models/Enrollment.js';
import Lesson from '../models/Lesson.js';

// @desc    Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const alreadyEnrolled = await Enrollment.findOne({ 
      studentId: req.user._id, 
      courseId: req.params.courseId 
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      studentId: req.user._id,
      courseId: req.params.courseId
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update progress (Mark lesson complete)
export const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({ message: 'lessonId is required' });
    }

    const enrollment = await Enrollment.findOne({ 
      studentId: req.user._id, 
      courseId: req.params.courseId 
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      
      // Calculate % progress
      const totalLessons = await Lesson.countDocuments({ courseId: req.params.courseId });
      enrollment.progress = totalLessons > 0
        ? (enrollment.completedLessons.length / totalLessons) * 100
        : 0;
      
      await enrollment.save();
    }

    res.json(enrollment);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: error.message });
  }
};