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
      DiscussionId: discussionId,
      delete_flag: false,
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

exports.deleteComment = (req, res, next) => {
  const { id } = req.query;
  Comment.findOne({ where: { id: id } })
  .then((comment) => {
    comment.update({ delete_flag: true} );
  })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => {
      res.status(500).send({
        message:
        error.message || "Une erreur est survenue lors de la suppression du commentaire." 
      });
    })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la recherche des commentaires." 
    });
  });
};

exports.editComment = (req, res, next) => {
  const { newComment, id } = req.body;
  Comment.findOne({ where: { id: id } })
  .then((comment) => {
    comment.update({ comment: newComment} );
  })
    .then(() => res.status(200).json({ message: 'Commentaire édité !' }))
    .catch(error => {
      res.status(500).send({
        message:
        error.message || "Une erreur est survenue lors de l'édition du commentaire." 
      });
    })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la recherche du commentaire." 
    });
  });
};