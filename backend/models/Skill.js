const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proficiencyLevel: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  isOffering: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  duration: {
    type: DataTypes.STRING
  },
  prerequisites: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'In Progress'),
    defaultValue: 'Active'
  }
});

module.exports = Skill; 