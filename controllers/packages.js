const Collection = require('../models/collection');
const Package = require('../models/package');

const index = async (req, res) => {
  req.body.userId = req.user._id;
  try {
    const packageDocuments = await Package.find({ userId: req.user._id });
    return res.render('packages/index', {
      packages: packageDocuments,
    });
  } catch (err) {
    return res.send(err);
  }
};

const create = async (req, res) => {
  const collectionId = req.params.id;
  req.body.userId = req.user._id;
  try {
    const existingPackage = await Package.find({
      name: req.body.name,
      userId: req.body.userId,
    });
    // if package exists, set value to existing, else create new package
    const packageDocument = existingPackage.length
      ? existingPackage[0]
      : await Package.create(req.body);

    const collectionDocument = await Collection.findById(collectionId);

    // if package exists in collection, return
    if (collectionDocument.packages.includes(packageDocument._id))
      return res.redirect(`/collections/${collectionId}`);

    collectionDocument.packages.push(packageDocument._id);
    await collectionDocument.save();
    return res.redirect(`/collections/${collectionId}`);
  } catch (err) {
    return res.redirect(`/collections/${collectionId}`);
  }
};

const show = async (req, res) => {
  try {
    const collectionDocuments = await Collection.find({
      packages: req.params.id,
    });
    const packageDocument = await Package.findById(req.params.id);
    return res.render('packages/show', {
      package: packageDocument,
      collections: collectionDocuments,
    });
  } catch (err) {
    return res.send(err);
  }
};

const removeFromCollection = async (req, res) => {
  const collectionId = req.params.collectionId;
  const packageId = req.params.packageId;
  req.body.userId = req.user._id;
  try {
    const collectionDocument = await Collection.findById(collectionId);
    console.log(collectionDocument.packages, '<- collectionDocument.packages');
    const packageIndex = collectionDocument.packages.indexOf(packageId);
    collectionDocument.packages.splice(packageIndex, 1);
    await collectionDocument.save();
    return res.redirect(`/collections/${collectionId}`);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  create,
  show,
  removeFromCollection,
  index,
};
