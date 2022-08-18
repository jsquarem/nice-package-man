const Profile = require("../models/profile");
const Collection = require("../models/collection");
const { checkHashKey } = require("../config/authHelper");

const authenticateApi = async (req, res) => {
  console.log(req.params, "<-req.params");
  const [email, key] = req.params.id.split(":");
  console.log(email, "<-email");
  try {
    const profileDocuments = await Profile.find({
      email: email,
    });
    const [profileDocument] = profileDocuments;
    const salt = profileDocument.authentication.key.authenticationKey.salt;
    //const email = profileDocument.email.toString();

    if (checkHashKey(email, salt, key)) return profileDocument;
    return res.json({ Error: "Incorrect authorization key" });
  } catch (err) {
    return res.send(err);
  }
};

const getCollections = async (req, res) => {
  console.log("in the api controller");
  try {
    const profile = authenticateApi(req, res);
    const collectionDocuments = await Collection.find({
      userId: req.user._id,
    });
    console.log("am authenticated");
    return res.json({ collectionDocuments });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  getCollections,
};

// checkHashKey(
//   '62fb006084ae4223975cdb6f', <-- profile._id
//   '3d21fce608ae97722265782264e5b848', <-- profile.authentication.key.authenticationKey.salt
//   'd50eb5f3481c9cb3064ef56ec3ce9f9a' <-- profile.authentication.key.authenticationKey.key
// );
