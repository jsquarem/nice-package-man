const {
  findCollectionDocumentsByUserId,
  createCollectionDocument,
  findCollectionDocumentById,
} = require("../models/collection");
const Package = require("../models/package");

const newCollection = (req, res) => {
  res.render("collections/new.ejs");
};

const index = async (req, res) => {
  console.log("in the index function");
  try {
    // console.log(req.user._id, '<-req.user._id');
    const collections = await findCollectionDocumentsByUserId(req.user._id);
    // console.log(collections, '<-collections');
    return res.render("collections/index", { collections });
  } catch (err) {
    return res.redirect("/collections");
  }
};

const create = async (req, res) => {
  req.body.userId = req.user._id;
  try {
    const collection = await createCollectionDocument(req.body);
    return res.redirect(`/collections/${collection._id}`);
  } catch (err) {
    return res.render("collections/new.ejs");
  }
};

const show = async (req, res) => {
  try {
    const collection = await findCollectionDocumentById(req.params.id);
    return res.render("collections/show", { collection, search: true });
  } catch (err) {
    return res.redirect("/collections");
  }
};

module.exports = {
  new: newCollection,
  create,
  index,
  show,
};
