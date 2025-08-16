const express = require('express');
const router = express.Router();
const { Skill, User } = require('../models');
const { auth } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email']
      }]
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's skills
router.get('/my-skills', auth, async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.user.id }
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a skill
router.post('/', auth, async (req, res) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a skill
router.put('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.update(req.body);
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a skill
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.destroy();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search skills
router.get('/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const skills = await Skill.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${term}%` } },
          { description: { [Op.like]: `%${term}%` } },
          { category: { [Op.like]: `%${term}%` } }
        ]
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'firstName', 'lastName', 'rating']
      }]
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email']
      }]
    });
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;