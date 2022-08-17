const {
  findOneCollectionDocumentById,
  createCollectionDocument,
  findManyCollectionDocuments,
  findOnePackageDocumentById,
  findManyPackageDocuments,
  createPackageDocument,
} = require("../config/dataServices");

const Package = require("../models/package");

const index = async (req, res) => {
  req.body.userId = req.user._id;
  try {
    const packageDocuments = await findManyPackageDocuments({
      userId: req.user._id,
    });
    return res.render("packages/index", {
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
    const existingPackage = await findManyPackageDocuments({
      name: req.body.name,
      userId: req.body.userId,
    });
    // if package exists, set value to existing, else create new package
    const packageDocument = existingPackage.length
      ? existingPackage[0]
      : await createPackageDocument(req.body);
    const collectionDocument = await findOneCollectionDocumentById(
      collectionId
    );
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
    const collectionDocuments = await findManyCollectionDocuments({
      packages: req.params.id,
    });
    const packageDocument = await findOnePackageDocumentById(req.params.id);
    return res.render("packages/show", {
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
    const collectionDocument = await findOneCollectionDocumentById(
      collectionId
    );
    const packageIndex = collectionDocument.packages.indexOf(packageId);
    collectionDocument.packages.splice(packageIndex, 1);
    await collectionDocument.save();
    return res.redirect(`/collections/${collectionId}`);
  } catch (err) {
    return res.send(err);
  }
};

const showPublic = async (req, res) => {
  try {
    const package = await findOnePackageDocumentById(req.params.id);
    if (!package.public) return res.render("packages/public");
    return res.render("packages/public", { package });
  } catch (err) {
    return res.redirect("/packages");
  }
};

const updatePublic = async (req, res) => {
  try {
    const package = await findOnePackageDocumentById(req.params.id);
    package.public = req.body.makepackagePublic === "true" ? true : false;
    package.save();
    return res.redirect("/packages");
  } catch (err) {
    return res.redirect("/packages");
  }
};

module.exports = {
  create,
  show,
  removeFromCollection,
  index,
  showPublic,
  updatePublic,
};
