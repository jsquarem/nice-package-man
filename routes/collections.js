var express = require('express');
var router = express.Router();
const collectionController = require('../controllers/collections');
const isLoggedIn = require('../config/auth.js');

router.get('/', isLoggedIn, collectionController.index);
router.get('/new', isLoggedIn, collectionController.new);
router.get('/:id', isLoggedIn, collectionController.show);

router.post('/', isLoggedIn, collectionController.create);

module.exports = router;
