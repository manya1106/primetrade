import Enrollment from '../models/Enrollment';
import Lesson from '../models/Lesson';

// @desc    Enroll in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const alreadyEnrolled = await Enrollment.findOne({ 
      studentId: req.user._id, 
      courseId: req.params.courseId 
    });

    if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = await Enrollment.create({
      studentId: req.user._id,
      courseId: req.params.courseId
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update progress (Mark lesson complete)
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ 
      studentId: req.user._id, 
      courseId: req.params.courseId 
    });

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      
      // Calculate % progress
      const totalLessons = await Lesson.countDocuments({ courseId: req.params.courseId });
      enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;
      
      await enrollment.save();
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};