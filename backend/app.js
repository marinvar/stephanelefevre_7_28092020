const express = require('express');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const history = require('connect-history-api-fallback');
const path = require('path');

const { dbConnect, dbTablesSync } = require('./db-setup');
const { insertData } = require('./db-insert');

const userRoutes = require('./routes/user');
const discussionRoutes = require('./routes/discussion');
const commentRoutes = require('./routes/comment');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

dbConnect()
.then(() => {
  dbTablesSync()
  .then(() => {
    insertData()
  })
})
.catch(error => console.error('Problem during the models synchronization : ', error));

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

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/discussion', discussionRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;