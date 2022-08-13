var express = require('express');
var router = express.Router();
const repositoryController = require('../controllers/repositories');

router.get(
  '/packages/:packageId/repositories/:repositoryIndex',
  repositoryController.delete
);
router.post('/packages/:id/repositories', repositoryController.create);
module.exports = router;
