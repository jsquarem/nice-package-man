const Collection = require('../models/collection');
const Package = require('../models/package');

module.exports = {
  new: newCollection,
  create,
  index,
  show,
};

function newCollection(req, res) {
  res.render('collections/new.ejs');
}

async function index(req, res) {
  try {
    const collectionDocuments = await Collection.find({ userId: req.user._id })
      .populate('packages')
      .exec();
    res.render('collections/index', { collections: collectionDocuments });
  } catch (err) {
    res.redirect('/collections');
  }
}

async function create(req, res) {
  req.body.userId = req.user._id;
  try {
    const collectionDocument = await Collection.create(req.body);
    return res.redirect(`/collections/${collectionDocument._id}`);
  } catch (err) {
    return res.render('collections/new.ejs');
  }
}

async function show(req, res) {
  try {
    const collectionDocument = await Collection.findById(req.params.id)
      .populate('packages')
      .exec();
    res.render('collections/show', {
      collection: collectionDocument,
    });
  } catch (err) {
    res.send(err);
  }
}
