const Profile = require('../models/profile');
const { generateHashKey } = require('../config/authHelper');

//const hashOut = generateHashKey('69hammySammy420');
// function checkHashKey(id, hash) {
//   const [salt, key] = hash.split(':');
//   const hashedBuffer = scryptSync(id, salt, 16);
//   const keyBuffer = Buffer.from(key, 'hex');
//   const match = timingSafeEqual(hashedBuffer, keyBuffer);
//   if (match) {
//     return console.log('login success!');
//   } else {
//     return console.log('login fail!');
//   }
// }
// checkHashKey(
//   '62fb006084ae4223975cdb6f',
//   '3d21fce608ae97722265782264e5b848',
//   'd50eb5f3481c9cb3064ef56ec3ce9f9a'
// );

const show = async (req, res) => {
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    const profileDocument = profileDocuments[0];
    return res.render('profiles/show', { profile: profileDocument });
  } catch (err) {
    return res.redirect('/profiles');
  }
};

const createAuthKey = async (req, res) => {
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    const profileDocument = profileDocuments[0];
    profileDocument.authentication.key = generateHashKey(
      profileDocument._id.toString()
    );
    profileDocument.authentication.count++;
    profileDocument.save();
    return res.render('profiles/show', { profile: profileDocument });
  } catch (err) {
    return res.redirect('/profiles');
  }
};

module.exports = {
  createAuthKey,
  show,
};
