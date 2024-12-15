const ipfs = require('../config/database');

// Add a course (Admin Only)
exports.addCourse = async (req, res) => {
  const { title, description, pricing, background, thumbnail, isFree, modules } = req.body;

  const courseData = {
    title,
    description,
    pricing,      // Course price (e.g., in ETH or any token)
    background,
    thumbnail,
    isFree,       // Boolean flag: true for free, false for paid
    modules,      // Array of module objects
  };

  try {
    const result = await ipfs.add(JSON.stringify(courseData));
    res.status(201).json({ message: 'Course added successfully', cid: result.path });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
};

// Upload content to a module (Admin Only)
exports.addModuleContent = async (req, res) => {
  const { courseCid, moduleIndex, content } = req.body;

  try {
    const files = await ipfs.cat(courseCid);
    const courseData = JSON.parse(files.toString());

    if (!courseData.modules[moduleIndex]) {
      return res.status(404).json({ message: 'Module not found' });
    }

    courseData.modules[moduleIndex].contents = courseData.modules[moduleIndex].contents || [];
    courseData.modules[moduleIndex].contents.push(content);

    const updatedCourseCid = await ipfs.add(JSON.stringify(courseData));
    res.status(200).json({ message: 'Content added successfully', cid: updatedCourseCid.path });
  } catch (error) {
    res.status(500).json({ message: 'Error adding content', error });
  }
};

// Retrieve a course
exports.getCourse = async (req, res) => {
  const { cid } = req.params;

  try {
    const files = await ipfs.cat(cid);
    const courseData = JSON.parse(files.toString());
    res.status(200).json({ course: courseData });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error });
  }
};

// Purchase a course (For Paid Courses)
exports.purchaseCourse = async (req, res) => {
  const { walletAddress, courseCid, paymentAmount } = req.body;

  try {
    const files = await ipfs.cat(courseCid);
    const courseData = JSON.parse(files.toString());

    if (courseData.isFree) {
      return res.status(400).json({ message: 'Course is free, no payment required' });
    }

    if (paymentAmount < courseData.pricing) {
      return res.status(400).json({ message: 'Insufficient payment' });
    }

    // Blockchain transaction for payment validation
    const receipt = await smartContract.methods.purchaseCourse(walletAddress, courseCid).send({ from: walletAddress, value: paymentAmount });
    res.status(200).json({ message: 'Course purchased successfully', transaction: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing course', error });
  }
};
