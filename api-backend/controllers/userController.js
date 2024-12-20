const uploadFileToFirebase = require("../utills/uploadFile");
const User = require("../models/User");



exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.uid)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const updatedProfile = await User.findOneAndUpdate({ _id: req.params.uid }, {
            $set: { ...req.body }
        }, { new: true })
        return res.json({ msg: "Profile Updated", profile: updatedProfile })
    } catch (error) {

    }

}

exports.updateUserPoint = async (req, res) => {
    try {
        const user = await User.findById(req.params.uid)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        // Validate the point value
        const pointsToAdd = Number(req.body.point);
        if (pointsToAdd === undefined || typeof pointsToAdd !== 'number' || pointsToAdd <= 0) {
            return res.status(400).json({ success: false, message: "Invalid point value" });
        }

        const updated = await User.findByIdAndUpdate(req.params.uid, {
            $inc: { points: pointsToAdd }
        }, { new: true })
        return res.status(200).json({ msg: "Profile Updated", profile: updated })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}


exports.updateUserProfilePic = async (req, res) => {
    try {
        const userExist = await User.findById(req.params.uid)
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }
        const response = await uploadFileToFirebase(req.file);
        const updatedProfile = await User.findByIdAndUpdate(req.params.uid, {
            profilePicture: response.downloadURL
        }, { new: true }).select('-password -role')
        return res.status(200).json({ success: true, message: "Profile Picture Updated Successfully", profile: updatedProfile });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.uid)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found", success: false })
        }
    } catch (error) {
        res.status(404).res.status(500).json({ message: "Error getting user", error });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find({}, "-password -role")
        res.status(200).json(user)
    } catch (error) {
        res.status(404).res.status(500).json({ message: "Error getting users", error });
    }
}


exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({}).sort({ points: -1 }); // Sort users by points in descending order
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error getting leaderboard", error });
    }
};










// exports.updateUserPrpfilePic = (upload.single("filename"), async (req, res) => {
//     const { title, description } = req.body;
//     try {
//         const response = await uploadFileToFirebase(req.file);
//         return res.send({ ...response, title, description });
//     } catch (error) {
//         return res.status(400).send(error.message);
//     }
// });