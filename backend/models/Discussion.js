const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Discussion = sequelize.define('Discussion', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false, // defaults to true
    unique: true
  },
  message: {
    type: DataTypes.STRING(1550),
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
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  // tableName: 'Discussions' not needed, by default all names are pluralized
  createdAt: 'created_at',
  updatedAt: 'updated_at'
  
});

module.exports = Discussion;