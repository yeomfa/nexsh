import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT ?? 8080;

// Start server
app.listen(PORT, '127.0.0.1', () =>
  console.log(`Server is running on PORT ${PORT}`),
);
