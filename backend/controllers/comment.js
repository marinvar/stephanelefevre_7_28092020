const { Op } = require('sequelize');

const { request } = require('express');
const Sequelize = require('sequelize');
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
  console.log(req.body);
  const comment = Comment.build({
    comment: req.body.comment,
    author: req.body.author,
    DiscussionId: req.body.discussionId
  });
  comment.save()
  .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
  .catch(error => res.status(400).json({ error }));
}

exports.getComments = (req, res, next) => {
  const comments = Comment.findAll({
    where: {
      DiscussionId: req.body.discussionId
    },
    order: [
      ['created_at', 'DESC']
    ],
    limit: 10
  })
  .then((comments) => {
    res.status(200).json({ comments })
  })
  .catch(error => res.status(400).json({ error }));
}