const { Sequelize, DataTypes } = require('sequelize');
const Discussion = require('./Discussion');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  // Other model options go here
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.hasMany(Discussion);
Discussion.belongsTo(User);

module.exports = User;