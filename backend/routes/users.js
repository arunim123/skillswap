const express = require('express');
const router = express.Router();
const { User, Skill } = require('../models');
const { auth } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Skill,
        as: 'skills'
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await user.update(req.body);
    const { password, ...userWithoutPassword } = updatedUser.toJSON();

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's skills
router.get('/:id/skills', async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.params.id }
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search users
router.get('/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${term}%` } },
          { firstName: { [Op.like]: `%${term}%` } },
          { lastName: { [Op.like]: `%${term}%` } }
        ]
      },
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 