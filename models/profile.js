const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    authentication: {
      count: {
        type: Number,
        default: 0,
        required: true,
      },
      key: {
        type: {},
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
