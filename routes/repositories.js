var express = require('express');
var router = express.Router();
const repositoryController = require('../controllers/repositories');
const isLoggedIn = require('../config/auth.js');

router.get(
  '/packages/:packageId/repositories/:repositoryIndex',
  isLoggedIn,
  repositoryController.delete
);
router.post(
  '/packages/:id/repositories',
  isLoggedIn,
  repositoryController.create
);
module.exports = router;
