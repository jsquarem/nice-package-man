const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

const isLoggedIn = require('../config/auth.js');
// const isLoggedIn = (req, res, next) => {
//   return next();
// };
/**
 * @swagger
 * components:
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
 *
 */

router.get('/:id/collections', apiController.getCollections);
// router.get('/new', isLoggedIn, collectionController.new);
// router.get('/:id', isLoggedIn, collectionController.show);

// router.post('/', isLoggedIn, collectionController.create);

module.exports = router;
