const User = require("../models/user");
const Profile = require("../models/profile");
const Collection = require("../models/collection");
const Package = require("../models/package");
const { checkHashKey } = require("../config/authHelper");

const authenticateApi = async (req, res) => {
  const [email, key] = req.params.id.split(":");
  const profileDocuments = await Profile.find({
    email: email,
  });
  const [profileDocument] = profileDocuments;
  const salt = profileDocument.authentication.key.authenticationKey.salt;
  if (checkHashKey(email, salt, key)) return profileDocument;
};

const getCollections = async (req, res) => {
  const [email, key] = req.params.id.split(":");
  try {
    const profileDocument = await authenticateApi(req, res);
    const collectionDocuments = await Collection.find({
      profileId: profileDocument._id,
    });
    return res.json({ collectionDocuments });
  } catch (err) {
    return res.send(err);
  }
};

const getPackages = async (req, res) => {
  const [email, key] = req.params.id.split(":");
  try {
    const profileDocument = await authenticateApi(req, res);
    const [userDocument] = await User.find({ profileId: profileDocument._id });
    const packageDocuments = await Package.find({
      userId: userDocument._id,
    });
    return res.json({ packageDocuments });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  getCollections,
  getPackages,
};
