const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    snippet: {
      type: String,
      required: true,
    },
    currentPackageVersion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
      default: '0.0.0',
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    repositories: [],
    snippets: [snippetSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Package', packageSchema);
