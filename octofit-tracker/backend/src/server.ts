import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port: PORT, codespaceName: codespaceName ?? null });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OctoFit Tracker backend listening on ${apiBaseUrl}`);
});
