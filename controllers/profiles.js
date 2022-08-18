const Profile = require("../models/profile");
const { generateHashKey } = require("../config/authHelper");

const show = async (req, res) => {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    const [profileDocument] = profileDocuments;
    return res.render("profiles/show", { profile: profileDocument });
  } catch (err) {
    return res.redirect("/profiles");
  }
};

const createAuthKey = async (req, res) => {
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    console.log(profileDocuments, "<-profileDocuments");
    const [profileDocument] = profileDocuments;
    profileDocument.authentication.key = await generateHashKey(
      profileDocument._id.toString()
    );
    profileDocument.authentication.count++;
    profileDocument.save();
    return res.redirect("/profiles");
  } catch (err) {
    return res.redirect("/profiles");
  }
};

module.exports = {
  createAuthKey,
  show,
};
