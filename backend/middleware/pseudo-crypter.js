/**
 * middleware encrypting pseudo for database storage
 */
const crypto = require('crypto');

const pseudoCrypter = (req, res, next) => {
  const secret = process.env.PSEUDO_PASS;
  req.body.pseudo = crypto.createHmac('sha256', secret)
                         .update(req.body.pseudo)
                         .digest('hex');
  next();
}

module.exports = pseudoCrypter;