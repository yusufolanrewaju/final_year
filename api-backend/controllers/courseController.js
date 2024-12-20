const Course = require('../models/Course');
const User = require('../models/User');
const uploadFileToFirebase = require('../utills/uploadFile');


// // Add a course (Admin Only)
exports.addNewCourse = async (req, res) => {
  try {
    const { title, description, point, videoUrl } = req.body
    const file = await uploadFileToFirebase(req.file);

    const newCourse = new Course({
      title,
      description,
      uploader: req.user.id,
      point: Number(point),
      videoUrl: file.downloadURL,
    })

    await newCourse.save();
    // res.status(200).json({ ...req.body, file })
    res.status(201).json({ success: true, course: newCourse })

  } catch (error) {
    res.status(500).json({ error: "Error uploading course", details: error.message });
  }
};


exports.updateCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(id)
    if (!course) {
      return res.status(300).json({ msg: "Course Not Found" })
    }
    const updatedCourse = await Course.findOneAndUpdate({ _id: id }, {
      $set: { ...req.body }
    }, { new: true })
    return res.status(200).json({ success: true, msg: "Course Updated", course: updatedCourse })
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message })
  }
}


exports.updateCourseVideoUrl = async (req, res) => {
  try {
    const course = await Course.findById(id)
    if (!course) {
      return res.status(300).json({ msg: "Course Not Found" })
    }
    const response = await uploadFileToFirebase(req.file);
    const updatedCourse = await Course.findOneAndUpdate({ _id: id }, {
      $set: { videoUrl: response?.downloadURL }
    }, { new: true })
    return res.status(200).json({ success: true, message: "Course Updated", course: updatedCourse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * Adds a comment to a course.
 * @param {string} courseId - The ID of the course.
 * @param {string} userId - The ID of the user making the comment.
 * @param {string} commentText - The text of the comment.
 */
exports.addComment = async (req, res) => {
  try {
    // Find the course
    const course = await Course.findById(req.params.cid);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course Not Found" })
    }

    // Create a new comment
    const comment = {
      userId: req.user.id,
      comment: req.body.comment,
    };

    // Add the comment to the course
    course.comments.push(comment);
    await course.save();

    return res.status(200).json({ success: true, comment, message: "comment added successfully" })

  } catch (error) {
    console.error('Error adding comment:', error);
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const allcourses = await Course.find().populate("uploader", "-password -courseProgress")

    return res.status(200).json({ success: true, allcourses })
  } catch (error) {
    return res.status(500).json({ message: error.messsage, success: false })
  }
}


/**
 * Marks a course as completed for a user and updates points.
 * @param {string} userId - The ID of the user.
 * @param {string} courseId - The ID of the course.
 */
exports.updateUserCourseProgress = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(400).json({ success: false, message: "User Not Found" })
    }

    // Find the course
    const course = await Course.findById(req.params.cid);
    if (!course) {
      return res.status(400).json({ success: false, message: "Course Not Found" })
    }

    // Update user's course progress
    const courseProgress = user.courseProgress.find(progress => progress.courseId.toString() === courseId);
    if (courseProgress) {
      courseProgress.completed = true; // Mark as completed
      courseProgress.progress = 100; // Set progress to 100%
    } else {
      user.courseProgress.push({ courseId, progress: 100, completed: true });
    }

    // Update user's points
    user.points += course.point; // Add course points to user's total points

    // Save the user
    await user.save();
    console.log('User points and progress updated successfully');
  } catch (error) {
    console.error('Error updating user points and progress:', error);
  }
}



exports.findCourse = async (req, res) => {
  try {
    const courseExist = await Course.findById(req.params.cid);
    if (!courseExist) {
      return res.status(404).json({ success: false, message: "Course Not Found" })
    }

    return res.status(200).json({ success: true, course: courseExist })
  } catch (error) {
    return res.status(500).json({ message: "Error finding the course" })
  }
}

// Delete a course (Admin Only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.cid);
    if (!course) {
      return res.status(400).json({ success: false, message: "Course Not Found" })
    }

    await Course.findByIdAndDelete(course._id);
    return res.status(400).json({ success: true, message: "Course Deleted" })
  } catch (error) {

  }
}






















// Upload Course

// Fetch Courses
// exports.getAllCourse = async (req, res) => {
//   try {
//     const courses = await Course.find().populate('uploader', 'username');
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching courses" });
//   }
// };




