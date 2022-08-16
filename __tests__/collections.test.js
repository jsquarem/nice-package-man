const collectionModel = jest.createMockFromModule("../models/collection");

const collectionController = require("../controllers/collections");

describe("colections", () => {
  beforeEach(() => {
    collectionModel.mockReset;
  });
  describe("show", () => {
    it("should return a single collection on valid request", async () => {
      const req = {
        params: {
          id: "testUserId",
        },
      };

      const res = {
        render: jest.fn(),
        redirect: jest.fn(),
      };

      collectionModel.findCollectionDocumentById = jest.fn((id) => []);

      await collectionController.show(req, res);

      expect(collectionModel.findCollectionDocumentById).toHaveBeenCalledTimes(
        1
      );
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledTimes(0);
    });
    //
    it("should redirect on invalid request", async () => {
      const req = {
        params: {
          id: "testUserId",
        },
      };

      const res = {
        render: jest.fn(),
        redirect: jest.fn(),
      };

      collectionModel.findCollectionDocumentById = jest.fn((id) => {
        throw new Error();
      });

      await collectionController.show(req, res);

      expect(
        mockCollectionModel.findCollectionDocumentById
      ).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledTimes(0);
      expect(res.redirect).toHaveBeenCalledTimes(1);
    });
  });
});
