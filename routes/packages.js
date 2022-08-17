var express = require("express");
var router = express.Router();
const packageController = require("../controllers/packages");
const isLoggedIn = require("../config/auth.js");

router.get("/packages", isLoggedIn, packageController.index);
router.get("/packages/:id", isLoggedIn, packageController.show);
router.post("/collections/:id/packages", isLoggedIn, packageController.create);
router.get(
  "/collections/:collectionId/packages/:packageId",
  isLoggedIn,
  packageController.removeFromCollection
);

router.get("/packages/:id/public", isLoggedIn, packageController.showPublic);
//router.post("/packages/:id/public", isLoggedIn, packageController.updatePublic);
module.exports = router;
