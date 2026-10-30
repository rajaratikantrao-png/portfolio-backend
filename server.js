import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/env.js';

try {
  await mongoose.connect(config.mongoUri);
  app.listen(config.port, () => console.log(`Portfolio API listening on http://localhost:${config.port}`));
} catch (error) {
  console.error(`Could not start Portfolio API: ${error.message}`);
  process.exit(1);
}
