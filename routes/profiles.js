const express = require('express');
const router = express.Router();
const profilesController = require('../controllers/profiles');
const isLoggedIn = require('../config/auth.js');
// const isLoggedIn = (req, res, next) => {
//   return next();
// };

router.get('/', isLoggedIn, profilesController.show);
//router.get('/new', isLoggedIn, collectionController.new);
//router.get('/:id', isLoggedIn, collectionController.show);
router.post('/', isLoggedIn, profilesController.createAuthKey);

module.exports = router;
