import 'dotenv/config';
import { createServer } from 'node:http';

import { createApp } from './app.js';

const app = createApp();
const server = createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
