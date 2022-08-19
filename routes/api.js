const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

const isLoggedIn = require("../config/auth.js");
/**
 * @swagger
 * /api/{apiKey}/collections:
 *  get:
 *    description: Get all authorized collections
 *    responses:
 *      200:
 *        description: Success
 * /api/{apiKey}/packages:
 *  get:
 *    description: Get all authorized packages
 *    responses:
 *      200:
 *        description: Success
 * components:
 *  securitySchemes:
 *    auth:
 *      type: apiKey
 *      in: query
 *      name: auth
 *  schemas:
 *    Collection:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the collection
 *        name:
 *          type: string
 *          description: The collection name
 *        description:
 *          type: string
 *          description: The description of the collection
 *        packages:
 *          description: Array of packages associated with the collection
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Package'
 *      example:
 *        id: kj3h4iuh52esdqd45
 *        name: Express REST API Collection
 *        description: A collection of packages to quickly bootstrap an Express REST API
 *        packages: [{packageId1},{packageId2},{packageId3}]
 *    Package:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - date
 *        - url
 *        - public
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the package
 *        name:
 *          type: string
 *          description: The package name
 *        description:
 *          type: string
 *          description: The description of the package
 *        version:
 *          type: string
 *          description: The version of the package when last checked
 *        date:
 *          type: date
 *          description: The last update date of the package on NPM
 *        url:
 *          type: string
 *          description: The URL of the NPM package page
 *        public:
 *          type: boolean
 *          description: Is the package shareable publicly
 *        userId:
 *          type: object
 *          description: The user id the package belongs to *
 *        repositories:
 *          type: array
 *          description: Array of repositories linked in the package
 *        snippets:
 *          type: array
 *          description: Array of code snippet objects embeded in the package
 *      example:
 *        id: hgfkj3h4iugj7666554764e5hjfgsdqd456565
 *        name: express
 *        description: Fast, unopinionated, minimalist web framework
 *        version: 4.18.1
 *        date: 022-04-29T19:33:40.441Z
 *        url: https://www.npmjs.com/package/express
 *        public: true
 *        userId: 554764e5hjfgsrt453werts43
 *        repositories: https://github.com/jmartymar/nice-package-man
 *        packages: [{snippet1},{snippet2},{snippet3}]
 *
 * security:
 *  - auth: []
 *
 */

router.get("/:id/collections", apiController.getCollections);
router.get("/:id/packages", apiController.getPackages);

module.exports = router;
