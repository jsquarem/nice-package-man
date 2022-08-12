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
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const collectionSchema = new mongoose.Schema(
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
    lastUpdate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    packageUrl: {
      type: String,
      required: true,
    },
    downloads: {
      type: Number,
      required: true,
    },
    repositories: [],
    snippets: [snippetSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Collection', collectionSchema);
