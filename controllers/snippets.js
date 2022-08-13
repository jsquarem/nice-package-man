const Package = require('../models/package');

module.exports = {
  create,
  delete: deleteSnippet,
};

async function create(req, res) {
  const packageId = req.params.id;
  console.log(packageId, '<-packageId');
  try {
    const snippetDocument = await Package.findById(packageId);
    console.log(req.body.snippet, '<-req.body.snippet');
    snippetDocument.snippets.push(req.body);
    console.log(snippetDocument, '<-snippetDocument');
    await snippetDocument.save();
    return res.redirect(`/packages/${packageId}`);
  } catch (err) {
    return res.redirect(`/packages/${packageId}`);
  }
}

async function deleteSnippet(req, res) {
  const packageId = req.params.packageId;
  const snippetIndex = req.params.snippetIndex;
  try {
    const snippetDocument = await Package.findById(packageId);
    snippetDocument.snippets.splice(snippetIndex, 1);
    await snippetDocument.save();
    return res.redirect(`/packages/${packageId}`);
  } catch (err) {
    return res.redirect(`/packages/${packageId}`);
  }
}
