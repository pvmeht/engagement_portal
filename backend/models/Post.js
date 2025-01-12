const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User'); // Default import

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

Post.belongsTo(User, { foreignKey: 'author_id' });

module.exports = Post; // Default export
