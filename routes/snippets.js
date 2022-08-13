var express = require('express');
var router = express.Router();
const snippetController = require('../controllers/snippets.js');
const isLoggedIn = require('../config/auth.js');

router.get(
  '/packages/:packageId/snippets/:snippetIndex',
  isLoggedIn,
  snippetController.delete
);
router.post('/packages/:id/snippets', isLoggedIn, snippetController.create);

module.exports = router;
