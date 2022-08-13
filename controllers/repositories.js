const Package = require('../models/package');

module.exports = {
  create,
  delete: deleteRepository,
};

async function create(req, res) {
  const packageId = req.params.id;
  try {
    const packageDocument = await Package.findById(packageId);
    packageDocument.repositories.push(req.body.url);
    await packageDocument.save();
    return res.redirect(`/packages/${packageId}`);
  } catch (err) {
    return res.redirect(`/packages/${packageId}`);
  }
}

async function deleteRepository(req, res) {
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
}
