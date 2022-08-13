var express = require('express');
var router = express.Router();
const packageController = require('../controllers/packages');

router.post('/collections/:id/packages', packageController.create);

router.get('/packages/:id', packageController.show);

module.exports = router;
