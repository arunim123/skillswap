const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SkillRequest = sequelize.define('SkillRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  requesterId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  skillId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Skills',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
    defaultValue: 'pending'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  proposedSchedule: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = SkillRequest; 