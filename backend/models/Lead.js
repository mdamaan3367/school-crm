const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    classApplyingFor: {
      type: String,
      required: true,
      trim: true,
    },
    enquirySource: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Closed'],
      default: 'New',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lead', leadSchema);
