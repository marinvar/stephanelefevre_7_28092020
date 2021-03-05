/* const Sequelize = require('sequelize'); */

const { request } = require('express');
const Sequelize = require('sequelize');
const Discussion = require('../models/Discussion');
const User = require('../models/User');

exports.createDiscussion = (req, res, next) => {
  const discussion = Discussion.build({
    subject: req.body.subject,
    message: req.body.message,
    UserId: req.body.userId
  });
  discussion.save()
  .then(() => res.status(201).json({ message: 'Discussion créée !' }))
  .catch(error => res.status(400).json({ error }));
}

exports.getDiscussions = (req, res, next) => {
  const discussions = Discussion.findAll({
    include: { model: User,
               attributes: ['pseudo'],
              }
  })
  .then((discussions) => {
    res.status(200).json({ discussions })
  })
  .catch(error => res.status(400).json({ error }));
}