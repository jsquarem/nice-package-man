const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collections");
const collectionModel = require("../modles/collectionModel");

collectionController.setup({ collectionModel });

const isLoggedIn = require("../config/auth.js");
// const isLoggedIn = (req, res, next) => {
//   return next();
// };

router.get("/", isLoggedIn, collectionController.index);
router.get("/new", isLoggedIn, collectionController.new);
router.get("/:id", isLoggedIn, collectionController.show);

router.post("/", isLoggedIn, collectionController.create);

module.exports = router;
