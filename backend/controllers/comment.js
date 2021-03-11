const Comment = require('../models/Comment');

const getPagination = (page, size) => {
  const limit = size ? +size : 6;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: comments } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, comments, totalPages, currentPage };
}

exports.createComment = (req, res, next) => {
  console.log(req.body);
  const comment = Comment.build({
    comment: req.body.comment,
    author: req.body.author,
    DiscussionId: req.body.discussionId
  });
  comment.save()
  .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la sauvegarde du commentaire." 
    });
  });
}

exports.getComments = (req, res, next) => {
  const { page, size, discussionId } = req.query;
  const { limit, offset } = getPagination(page, size);

  Comment.findAndCountAll({
    where: {
      DiscussionId: discussionId
    },
    order: [
      ['created_at', 'DESC']
    ],
    limit,
    offset
  })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la recherche des commentaires." 
    });
  });
};