import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Activity.deleteMany({});
    await Team.deleteMany({});

    const users = await User.create([
      { name: 'Maya', email: 'maya@example.com', age: 15, fitnessLevel: 'advanced', points: 320 },
      { name: 'Leo', email: 'leo@example.com', age: 16, fitnessLevel: 'intermediate', points: 240 },
      { name: 'Ava', email: 'ava@example.com', age: 14, fitnessLevel: 'beginner', points: 180 },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', duration: 30, distance: 5, notes: 'Morning run' },
      { userId: users[1]._id, type: 'strength', duration: 45, notes: 'Upper body workout' },
      { userId: users[2]._id, type: 'walking', duration: 20, distance: 2, notes: 'After-school walk' },
    ]);

    await Team.create([
      { name: 'Blue Falcons', members: [users[0]._id, users[1]._id], points: 560 },
      { name: 'Green Tigers', members: [users[2]._id], points: 180 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
