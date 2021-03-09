const { Sequelize, DataTypes } = require('sequelize');
const Discussion = require('./Discussion');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Comment = sequelize.define('Comment', {
  comment: {
    type: DataTypes.STRING(1550),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    get: function () {
      let rawData = this.getDataValue('created_at');
      const dateAndTime = rawData.toJSON().slice(0,10).split('-').reverse().join('/') + ' à ' + ('00' + rawData.getHours()).slice(-2) + 'h ' + ('00' + rawData.getMinutes()).slice(-2) + 'min ' + ('00' + rawData.getSeconds()).slice(-2) + 's';
      return dateAndTime;
    }
  },
  updated_at: {
    type: DataTypes.DATE,
    get: function () {
      let rawData = this.getDataValue('updated_at');
      const dateAndTime = rawData.toJSON().slice(0,10).split('-').reverse().join('/') + ' à ' + ('00' + rawData.getHours()).slice(-2) + 'h ' + ('00' + rawData.getMinutes()).slice(-2) + 'min ' + ('00' + rawData.getSeconds()).slice(-2) + 's';
      return dateAndTime;
    }
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
  
});

Discussion.hasMany(Comment);
Comment.belongsTo(Discussion);

module.exports = Comment;