const { smartContract: coursePurchaseContract } = require('../config/blockchain');

exports.purchaseCourse = async (req, res) => {
  const { walletAddress, courseCid, coursePrice } = req.body;

  try {
    const receipt = await coursePurchaseContract.methods
      .purchaseCourse(courseCid, coursePrice)
      .send({ from: walletAddress });

    res.status(200).json({ message: 'Course purchased successfully', transaction: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing course', error });
  }
};
