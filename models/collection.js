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
  try {
    const collectionDocument = await Collection.findById(id)
      .populate('packages')
      .exec();
    return collectionDocument;
  } catch (err) {
    return res.send(err);
  }
};

const findCollectionDocumentsByUserId = async (userId) => {
  try {
    const collectionDocuments = await Collection.find({ userId })
      .populate('packages')
      .exec();
    return collectionDocuments;
  } catch (err) {
    return res.send(err);
  }
};

const createCollectionDocument = async (newCollection) => {
  try {
    const collectionDocument = await Collection.create(newCollection);
    return collectionDocument;
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  findCollectionDocumentById,
  findCollectionDocumentsByUserId,
  createCollectionDocument,
};