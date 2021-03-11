const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const history = require('connect-history-api-fallback');
/* const bcrypt = require('bcrypt');
const crypto = require('crypto'); */

const { dbConnect, dbTablesSync } = require('./db-setup');
const { insertData } = require('./db-insert');

/* const saucesRoutes = require('./routes/sauces'); */
const userRoutes = require('./routes/user');
const discussionRoutes = require('./routes/discussion');
const commentRoutes = require('./routes/comment');
/* const User = require('./models/User');
const Discussion = require('./models/Discussion');
const Comment = require('./models/Comment'); */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

/* const encryptEmail = (email) => {
  const secret = process.env.EMAIL_PASS;
  return crypto.createHmac('sha256', secret)
                         .update(email)
                         .digest('hex');
};

const encryptPseudo = (pseudo) => {
  const secret = process.env.PSEUDO_PASS;
  const concat = pseudo + '_' + secret;
  return Buffer.from(concat).toString('hex');
} */

dbConnect()
.then(() => {
  dbTablesSync()
  .then(() => {
    insertData()
  })
})
.catch(error => console.error('Problem during the models synchronization : ', error));
/* .then(() => {
  bcrypt.hash("rhMAST3R", 10)
  .then(hash1 => {
    User.bulkCreate([
      { pseudo: encryptPseudo("rhMaster"), email: encryptEmail("rhmaster@groupomania.com"), password: hash1, isAdmin: true }
    ])
  })
  .then(() => {
    bcrypt.hash("darkB1RD", 10)
    .then(hash2 => {
      User.bulkCreate([
        { pseudo: encryptPseudo("darkBird"), email: encryptEmail("darkbird@groupomania.com"), password: hash2 }
      ])
    })
  })
  .then(() => {
    bcrypt.hash("countingCR0W", 10)
    .then(hash3 => {
      User.bulkCreate([
        { pseudo: encryptPseudo("countingCrow"), email: encryptEmail("countingcrow@groupomania.com"), password: hash3 }
      ])
      .then(() => {
        Discussion.bulkCreate([
          { 
            subject: "Bienvenue à toutes et tous",
            message: "Une petite note de votre manager RH pour vous demander de respecter vos collègues sur le nouveau réseau social",
            UserId: 1,
            created_at: '2021-03-10 15:49:52',
            updated_at: '2021-03-10 15:49:52'
          }, {
            subject: "Merci pour ce bel outil",
            message: "Un grand merci de la part de l'équipe de nuit pour ce bel outil que l'on commence à prendre en main !",
            UserId: 2,
            created_at: '2021-03-11 04:38:19',
            updated_at: '2021-03-11 04:38:19'
          }, { 
            subject: "Bienvenue !",
            message: "Bienvenue aux nouveaux arrivants ! Pensez à passer à la comptabilité pour recevoir vos documents d'intégration...",
            UserId: 3,
            created_at: '2021-03-11 13:17:35',
            updated_at: '2021-03-11 13:17:35'
          }
        ])
        .then(() => {
          Comment.bulkCreate([
            {
              comment: "Merci, je ne manquerai pas de passer prendre un café en même temps...",
              author: "darkBird",
              DiscussionId: 3,
              created_at: '2021-03-11 14:12:03',
              updated_at: '2021-03-11 14:12:03'
            },
            {
              comment: "Notre direction vous remercie pour le travail effectué par vos équipes !",
              author: "rhMaster",
              DiscussionId: 2,
              created_at: '2021-03-11 08:19:32',
              updated_at: '2021-03-11 08:19:32'
            },
            {
              comment: "Merci pour ce petit rappel... On va le bichonner !!!",
              author: "countingCrow",
              DiscussionId: 1,
              created_at: '2021-03-11 13:42:38',
              updated_at: '2021-03-11 13:42:28'
            },
            {
              comment: "Je transmettrai vos remerciements aux équipes...",
              author: "darkBird",
              DiscussionId: 2,
              created_at: '2021-03-11 21:13:43',
              updated_at: '2021-03-11 21:13:43'
            }
          ])  
        })
      })
    })
  })
}) */

/* .catch(error => console.error('Problem during data bulk creation : ', error)) */

const app = express();

/**
 * Helmet is used for security purposes, to avaoid several attacks like xss
 */
app.use(helmet());

app.use(history());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

/* app.use('/images', express.static(path.join(__dirname, 'images'))); */

app.use('/api/discussion', discussionRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;