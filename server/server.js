import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT ?? 8080;

// Start server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
