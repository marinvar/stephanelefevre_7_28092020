/**
 * middleware validating user inputs with string regex
 */
const formValidator = (req, res, next) => {

  const regX = /[^\p{L}\s\d'-]+/ug;
  
  const parsedObject = { ...req.body };

  if (parsedObject.subject) {
    parsedObject.subject = parsedObject.subject.replace(regX, '');
  }
  if (parsedObject.message) {
    parsedObject.message = parsedObject.message.replace(regX, '');
  }
  if (parsedObject.comment) {
    parsedObject.comment = parsedObject.comment.replace(regX, '');
  }
  if (parsedObject.newComment) {
    parsedObject.newComment = parsedObject.newComment.replace(regX, '');
  }
  if (parsedObject.author) {
    parsedObject.author = parsedObject.author.replace(regX, '');
  }
  if (parsedObject.discussionId) {
    parsedObject.discussionId = parseInt(parsedObject.discussionId.toString().replace(/[^0-9]+/g, ''));
  }
  if (parsedObject.userId) {
    parsedObject.userId = parseInt(parsedObject.userId.toString().replace(/[^0-9]+/g, ''));
  }

  req.body = parsedObject;

  /* req.file ? req.body.sauce = JSON.stringify(sauceObject) : req.body = sauceObject; */
  
  next();
}

module.exports = formValidator;