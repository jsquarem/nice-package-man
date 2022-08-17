const collectionController = require("../controllers/collections");

describe("colections", () => {
  describe("show", () => {
    it("should return a single collection on valid request", async () => {
      const collectionModel = {
        findCollectionDocumentById: jest.fn((id) => []),
      };

      const req = {
        params: {
          id: "testUserId",
        },
      };
      const res = {
        render: jest.fn(),
        redirect: jest.fn(),
      };

      collectionController.setup(collectionModel);
      await collectionController.show(req, res);

      expect(collectionModel.findCollectionDocumentById).toHaveBeenCalledTimes(
        1
      );
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledTimes(0);
    });
  });
});
