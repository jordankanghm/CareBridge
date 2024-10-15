const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');

const Request = sequelize.define('Request', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open',
  },
});

Request.belongsTo(User, { as: 'elderly' });

module.exports = Request;