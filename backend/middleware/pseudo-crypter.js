/**
 * middleware encrypting pseudo for database storage
 */
/* const crypto = require('crypto'); */
const secret = process.env.PSEUDO_PASS;

const pseudoCrypter = (req, res, next) => {
  const concat = req.body.pseudo + '_' + secret;
  req.body.pseudo = Buffer.from(concat).toString('hex');
  next();
}

module.exports = pseudoCrypter;