const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  walletAddress: { type: String },
  points: { type: Number, default: 0 },
  password: { type: String, required: true },
  courseProgress: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 }, // Progress in percentage
    completed: { type: Boolean, default: false }
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },

});

module.exports = mongoose.model('User', userSchema);
