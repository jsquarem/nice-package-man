const mongoose = require("mongoose");
const Package = require("../models/package");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Name me!",
    },
    description: {
      type: String,
      required: true,
    },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

// database logic
const findCollectionDocumentById = (id) => {
  const collectionDocument = Collection.findById(id)
    .populate("packages")
    .exec();
  return collectionDocument;
};

const findCollectionDocumentsByUserId = (userId) => {
  // console.log('findCollectionDocumentsByUserId');
  // console.log(userId, '<-userId');
  const collectionDocuments = Collection.find({ userId })
    .populate("packages")
    .exec();
  // console.log(collectionDocuments, '<-collectionDocuments');
  return collectionDocuments;
};

const createCollectionDocument = (newCollection) => {
  const collectionDocument = Collection.create(newCollection);
  return collectionDocument;
};

module.exports = {
  findCollectionDocumentById,
  findCollectionDocumentsByUserId,
  createCollectionDocument,
};
