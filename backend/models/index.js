const sequelize = require('../config/database');
const User = require('./User');
const Skill = require('./Skill');
const SkillRequest = require('./SkillRequest');

// User - Skill associations
User.hasMany(Skill, {
  foreignKey: 'userId',
  as: 'skills'
});
Skill.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User - SkillRequest associations (as requester)
User.hasMany(SkillRequest, {
  foreignKey: 'requesterId',
  as: 'requestsMade'
});
SkillRequest.belongsTo(User, {
  foreignKey: 'requesterId',
  as: 'requester'
});

// Skill - SkillRequest associations
Skill.hasMany(SkillRequest, {
  foreignKey: 'skillId',
  as: 'requests'
});
SkillRequest.belongsTo(Skill, {
  foreignKey: 'skillId',
  as: 'skill'
});

module.exports = {
  sequelize,
  User,
  Skill,
  SkillRequest
}; 