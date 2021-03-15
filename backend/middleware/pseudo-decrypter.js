/**
 * middleware decrypting pseudo for database storage
 */
/* const secret = process.env.PSEUDO_PASS; */
const mung = require('express-mung');

function pseudoDecrypter (body, req, res){
  if (body.discussions) {
    const discussions = body.discussions;
    for (discussion of discussions) {
      const concat = Buffer.from(discussion.dataValues.User.pseudo, 'hex').toString();
      discussion.dataValues.User.pseudo = concat.substring(0, concat.lastIndexOf('_'));
    }
    body.discussions = discussions;
  }
  return body;
}

module.exports = mung.json(pseudoDecrypter);