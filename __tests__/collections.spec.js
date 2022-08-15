const collectionController = require('../controllers/collections');

describe('colections', () => {
    describe('index', () => {
        it('should return list of collections on valid request', async () => {
            const collectionModel = jest.createMockFromModule('../models/collection');
            collectionModel.findCollectionDocumentById = jest.fn(userId => []);
            
            const req = {
                params: {
                    user_id: 'testUserId'
                }
            }
            const res = {
                render: jest.fn(),
                redirect: jest.fn(),
            }

            await collectionController.index(req, res);

            expect(collectionModel.findCollectionDocumentById).toHaveBeenCalledTimes(1);
            expect(res.render).toHaveBeenCalledTimes(1);
            expect(res.redirect).toHaveBeenCalledTimes(0);
        });
    });
})