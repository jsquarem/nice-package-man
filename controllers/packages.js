const Collection = require('../models/collection');
const Package = require('../models/package');

module.exports = {
  //new: newPackage,
  create,
  //index,
  show,
};

async function create(req, res) {
  const collectionsId = req.params.id;
  try {
    const packageDocument = await Package.create(req.body);
    const addToPackages = await Collection.findById(collectionsId);
    addToPackages.packages.push(packageDocument._id);
    await addToPackages.save();
    return res.redirect(`/collections/${collectionsId}`);
  } catch (err) {
    return res.redirect(`/collections/${collectionsId}`);
  }
}

async function show(req, res) {
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
}
