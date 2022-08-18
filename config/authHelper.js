const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");

function generateHashKey(email) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(email, salt, 16).toString("hex");
  return { authenticationKey: { salt: salt, key: hash } };
}

function checkHashKey(email, salt, key) {
  const hashedBuffer = scryptSync(email, salt, 16);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  if (match) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  generateHashKey,
  checkHashKey,
};
