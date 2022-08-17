const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collections");
const collectionModel = require("../models/collection");

//collectionController.setup({ collectionModel });

const isLoggedIn = require("../config/auth.js");
// const isLoggedIn = (req, res, next) => {
//   return next();
// };

router.get("/", isLoggedIn, collectionController.index);
router.get("/new", isLoggedIn, collectionController.new);
router.get("/:id", isLoggedIn, collectionController.show);
router.get("/:id/public", collectionController.showPublic);
router.post("/", isLoggedIn, collectionController.create);
router.post("/:id/public", collectionController.updatePublic);

module.exports = router;
