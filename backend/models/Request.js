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
  elderlyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Define the associations
Request.belongsTo(User, { as: 'elderly', foreignKey: 'elderlyId' });
Request.belongsTo(User, { as: 'volunteer', foreignKey: 'volunteerId' });

module.exports = Request;
