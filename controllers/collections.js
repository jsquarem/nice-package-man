const Collection = require('../models/collection');
const Package = require('../models/package');

const newCollection = (req, res) => {
  res.render('collections/new.ejs');
};

const index = async (req, res) => {
  try {
    const collections = await findCollectionDocumentsByUserId(req, res);
    return res.render('collections/index', { collections });
  } catch (err) {
    return res.redirect('/collections');
  }
};

const create = async (req, res) => {
  req.body.userId = req.user._id;
  try {
    const collection = createCollectionDocument(req, res);
    return res.redirect(`/collections/${collection._id}`);
  } catch (err) {
    return res.render('collections/new.ejs');
  }
};

const show = async (req, res) => {
  try {
    const collection = await findCollectionDocumentById(req);
    return res.render('collections/show', { collection, search: true });
  } catch (err) {
    return res.redirect('/collections');
  }
};

// database logic
const findCollectionDocumentById = async (req, res) => {
  try {
    const collectionDocument = await Collection.findById(req.params.id)
      .populate('packages')
      .exec();
    return collectionDocument;
  } catch (err) {
    return res.send(err);
  }
};

const findCollectionDocumentsByUserId = async (req, res) => {
  try {
    const collectionDocuments = await Collection.find({ userId: req.user._id })
      .populate('packages')
      .exec();
    return collectionDocuments;
  } catch (err) {
    return res.send(err);
  }
};

const createCollectionDocument = async (req, res) => {
  try {
    const collectionDocument = await Collection.create(req.body);
    return collectionDocument;
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  new: newCollection,
  create,
  index,
  show,
  findCollectionDocumentById,
  findCollectionDocumentsByUserId,
  createCollectionDocument,
};
