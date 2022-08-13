var express = require('express');
var router = express.Router();
const packageController = require('../controllers/packages');

router.get('/packages/:id', packageController.show);
router.post('/collections/:id/packages', packageController.create);

module.exports = router;
