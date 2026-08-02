import { Router } from 'express';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId', 'name fitnessLevel').sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name fitnessLevel').sort({ points: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(5);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

export default router;
