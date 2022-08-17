const Collection = require("../models/collection");
const Package = require("../models/package");

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

const findOnePackageDocumentById = (id) => {
  const packageDocument = Package.findById(id);
  return packageDocument;
};

const findManyPackageDocuments = (searchObj) => {
  const packageDocuments = Package.find(searchObj);
  return packageDocuments;
};

const createPackageDocument = (newPackage) => {
  const packageDocument = Package.create(newPackage);
  return packageDocument;
};

module.exports = {
  findOneCollectionDocumentById,
  findManyCollectionDocuments,
  createCollectionDocument,
  findOnePackageDocumentById,
  findManyPackageDocuments,
  createPackageDocument,
};
