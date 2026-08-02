import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running');
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on http://localhost:${PORT}`);
});
