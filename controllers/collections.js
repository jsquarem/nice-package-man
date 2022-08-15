const Collection = require('../models/collection');
const Package = require('../models/package');

const newCollection = (req, res) => {
  res.render('collections/new.ejs');
};

const index = async (req, res) => {
  try {
    const collectionDocuments = await Collection.find({ userId: req.user._id })
      .populate('packages')
      .exec();
    return res.render('collections/index', {
      collections: collectionDocuments,
    });
  } catch (err) {
    return res.redirect('/collections');
  }
};

const create = async (req, res) => {
  req.body.userId = req.user._id;
  try {
    const collectionDocument = await Collection.create(req.body);
    return res.redirect(`/collections/${collectionDocument._id}`);
  } catch (err) {
    return res.render('collections/new.ejs');
  }
};

const show = async (req, res) => {
  try {
    const collectionDocument = await Collection.findById(req.params.id)
      .populate('packages')
      .exec();
    res.render('collections/show', {
      collection: collectionDocument,
    });
  } catch (err) {
    return res.send(err);
  }
};

const findCollectionDocument = async () => {};

module.exports = {
  new: newCollection,
  create,
  index,
  show,
};
