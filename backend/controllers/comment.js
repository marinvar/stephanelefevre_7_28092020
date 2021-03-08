const { Op } = require('sequelize');

const { request } = require('express');
const Sequelize = require('sequelize');
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
  const comment = Comment.build({
    message: req.body.message,
    author: req.body.subject,
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
    ]
  })
  .then((comments) => {
    res.status(200).json({ comments })
  })
  .catch(error => res.status(400).json({ error }));
}