const {
  findOneCollectionDocumentById,
  createCollectionDocument,
  findManyCollectionDocuments,
} = require("../config/dataServices");

const newCollection = (req, res) => {
  res.render("collections/new.ejs");
};

const index = async (req, res) => {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  try {
    const collections = await findManyCollectionDocuments({
      userId: req.user._id,
    });
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
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  try {
    const collection = await findOneCollectionDocumentById(req.params.id);
    // return search: true to include search static files
    return res.render("collections/show", { collection, search: true });
  } catch (err) {
    return res.redirect("/collections");
  }
};

const showPublic = async (req, res) => {
  try {
    const collection = await findOneCollectionDocumentById(req.params.id);
    if (!collection.public) return res.render("collections/public");
    return res.render("collections/public", { collection });
  } catch (err) {
    return res.redirect("/collections");
  }
};

const updatePublic = async (req, res) => {
  try {
    const collection = await findOneCollectionDocumentById(req.params.id);
    collection.public = req.body.makeCollectionPublic === "true" ? true : false;
    collection.save();
    if (req.body.collectionIndex === "true")
      return res.redirect("/collections");
    return res.redirect(`/collections/${req.params.id}`);
  } catch (err) {
    return res.redirect("/collections");
  }
};

module.exports = {
  new: newCollection,
  create,
  index,
  show,
  showPublic,
  updatePublic,
};
