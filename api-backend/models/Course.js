const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  point: { type: Number, default: 0 },
  videoUrl: { type: String, required: true },
  comments: [commentSchema]
}, { timestamps: true },);

module.exports = mongoose.model('Course', courseSchema);
