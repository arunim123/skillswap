const express = require('express');
const router = express.Router();
const { SkillRequest, User, Skill } = require('../models');
const { auth } = require('../middleware/auth');

// Get all requests for a user (both made and received)
router.get('/', auth, async (req, res) => {
  try {
    const requestsMade = await SkillRequest.findAll({
      where: { requesterId: req.user.id },
      include: [
        {
          model: Skill,
          as: 'skill',
          include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
        }
        ]
    });

    const requestsReceived = await SkillRequest.findAll({
      include: [
        {
          model: Skill,
          as: 'skill',
          where: { userId: req.user.id },
          include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
        },
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'username']
        }
      ]
    });

    res.json({
      requestsMade,
      requestsReceived
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new request
router.post('/', auth, async (req, res) => {
  try {
    const { skillId, message, proposedSchedule } = req.body;

    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    if (skill.userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot request your own skill' });
    }

    const request = await SkillRequest.create({
      requesterId: req.user.id,
      skillId,
      message,
      proposedSchedule
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update request status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SkillRequest.findByPk(req.params.id, {
      include: [{ model: Skill, as: 'skill' }]
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.skill.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await request.update({ status });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a request
router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await SkillRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.requesterId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await request.destroy();
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 