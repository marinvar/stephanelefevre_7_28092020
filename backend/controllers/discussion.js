const { Op } = require('sequelize');

const { request } = require('express');
const Sequelize = require('sequelize');
const Discussion = require('../models/Discussion');
const User = require('../models/User');

const getPagination = (page, size) => {
  const limit = size ? +size : 6;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: discussions } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, discussions, totalPages, currentPage };
}

exports.createDiscussion = (req, res, next) => {
  const discussionObject = req.file ? {
    ...JSON.parse(req.body.discussion),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  const discussion = Discussion.build({
    subject: discussionObject.subject,
    message: discussionObject.message,
    UserId: discussionObject.userId,
    imageUrl: discussionObject.imageUrl,
  });
  discussion.save()
  .then((discussion) => {
    Discussion.findOne({ 
      where: {id: discussion.id},
      include: { model: User,
        attributes: ['pseudo'],
      }
    })
    .then((discussionWithUser) => {
      const concat = Buffer.from(discussionWithUser.dataValues.User.dataValues.pseudo, 'hex').toString();
      discussionWithUser.dataValues.User.pseudo = concat.substring(0, concat.lastIndexOf('_'));
      res.status(201).json({ discussion: discussionWithUser.dataValues, message: 'Discussion créée !' })
    })
    .catch(error => {
      res.status(500).send({
        message:
        error.message || "Une erreur est survenue lors de la sauvegarde de la discussion." 
      });
    });
  })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la sauvegarde de la discussion." 
    });
  });
}

exports.getDiscussions = (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const discussions = Discussion.findAndCountAll({
    include: { model: User,
               attributes: ['pseudo'],
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
        error.message || "Une erreur est survenue lors de la recherche des discussions." 
    });
  });
}

exports.getDiscussionsFiltered = (req, res, next) => {
  const { page, size, filter } = req.query;
  const { limit, offset } = getPagination(page, size);
  let words = [];
  if (filter.length > 1) {
    for (word of filter) {
      const wordToAdd = {[Op.substring]: word};
      words.push(wordToAdd);
    }
  } else {
    words = {[Op.substring]: filter[0]};
  }
  const discussions = Discussion.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.or]: [
        {subject: 
          {
            [Op.and]: words
          }
        },
        {message: 
          {
            [Op.and]: words
          }
        }
      ]
    },
    order: [
      ['created_at', 'DESC']
    ],
    include: { model: User,
               attributes: ['pseudo'],
              }
  })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la recherche des discussions." 
    });
  });
}