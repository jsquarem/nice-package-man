var express = require('express');
var router = express.Router();
const packageController = require('../controllers/packages');
const isLoggedIn = require('../config/auth.js');

router.get('/packages/:id', isLoggedIn, packageController.show);
router.post('/collections/:id/packages', isLoggedIn, packageController.create);

module.exports = router;
