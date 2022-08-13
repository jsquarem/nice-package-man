var express = require('express');
var router = express.Router();
const snippetController = require('../controllers/snippets');

router.get(
  '/packages/:packageId/snippets/:snippetIndex',
  snippetController.delete
);
router.post('/packages/:id/snippets', snippetController.create);
module.exports = router;
