const Collection = require('../models/collection');
const Package = require('../models/package');

const create = async (req, res) => {
  const collectionsId = req.params.id;
  req.body.userId = req.user._id;
  console.log('creating');
  try {
    const existingPackage = await Package.find({
      name: req.body.name,
      userId: req.body.userId,
    });
    // if package exists, set value to existing, else create new package
    const packageDocument = existingPackage.length
      ? existingPackage[0]
      : await Package.create(req.body);

    const collectionDocument = await Collection.findById(collectionsId);

    // if package exists in collection, return
    if (collectionDocument.packages.includes(packageDocument._id))
      return res.redirect(`/collections/${collectionsId}`);

    collectionDocument.packages.push(packageDocument._id);
    await collectionDocument.save();
    return res.redirect(`/collections/${collectionsId}`);
  } catch (err) {
    return res.redirect(`/collections/${collectionsId}`);
  }
};

const show = async (req, res) => {
  try {
    const collectionDocuments = await Collection.find({
      packages: req.params.id,
    });
    const packageDocument = await Package.findById(req.params.id)
      //.populate('packages')
      .exec();
    res.render('packages/show', {
      package: packageDocument,
      collections: collectionDocuments,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  create,
  show,
};
