const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function generateHashKey(id) {
  //console.log('im in the hash generator');
  const salt = randomBytes(16).toString('hex');
  const hashedId = scryptSync(id, salt, 16).toString('hex');
  //console.log(salt, '<-salt');
  //console.log(hashedId, '<-hashedId');
  return { authenticationKey: { salt: salt, key: hashedId } };
}
//const hashOut = generateHashKey('69hammySammy420');

function checkHashKey(id, salt, key) {
  //const [salt, key] = hash.split(':');
  const hashedBuffer = scryptSync(id, salt, 16);
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  if (match) {
    return true;
  } else {
    return false;
  }
}
//checkHashKey('69hammySammy420', hashOut.authenticationKey);

module.exports = {
  generateHashKey,
  checkHashKey,
};
