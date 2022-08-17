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
    public: {
      type: Boolean,
      default: false,
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
const findOneCollectionDocumentById = (id) => {
  const collectionDocument = Collection.findById(id)
    .populate("packages")
    .exec();
  return collectionDocument;
};

const findManyCollectionDocuments = (searchObj) => {
  const collectionDocuments = Collection.find(searchObj)
    .populate("packages")
    .exec();
  return collectionDocuments;
};

const createCollectionDocument = (newCollection) => {
  const collectionDocument = Collection.create(newCollection);
  return collectionDocument;
};

module.exports = {
  findOneCollectionDocumentById,
  findManyCollectionDocuments,
  createCollectionDocument,
};

//module.exports = mongoose.model('Collection', collectionSchema);
