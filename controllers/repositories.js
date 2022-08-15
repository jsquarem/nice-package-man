const Package = require('../models/package');

const create = async (req, res) => {
  const packageId = req.params.id;
  try {
    const packageDocument = await Package.findById(packageId);
    packageDocument.repositories.push(req.body.url);
    await packageDocument.save();
    return res.redirect(`/packages/${packageId}`);
  } catch (err) {
    return res.redirect(`/packages/${packageId}`);
  }
};

const deleteRepository = async (req, res) => {
  const packageId = req.params.packageId;
  const repositoryIndex = req.params.repositoryIndex;
  try {
    const packageDocument = await Package.findById(packageId);
    packageDocument.repositories.splice(repositoryIndex, 1);
    await packageDocument.save();
    return res.redirect(`/packages/${packageId}`);
  } catch (err) {
    return res.redirect(`/packages/${packageId}`);
  }
};

module.exports = {
  create,
  delete: deleteRepository,
};
