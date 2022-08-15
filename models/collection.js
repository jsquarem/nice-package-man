const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Name me!',
    },
    description: {
      type: String,
      required: true,
    },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const findCollectionDocumentById = async (id) => {
  const collectionDocument = await Collection.findById(id)
    .populate('packages')
    .exec();
    return collectionDocument;
};

const findCollectionDocumentsByUserId = async (userId) => {
  const collectionDocuments = await Collection.find({ userId })
    .populate('packages')
    .exec();
  return collectionDocuments;
};

const createCollectionDocument = async (newCollection) => {
  const collectionDocument = await Collection.create(newCollection);
  return collectionDocument;
};

module.exports = {
  findCollectionDocumentById,
  findCollectionDocumentsByUserId,
  createCollectionDocument,
};