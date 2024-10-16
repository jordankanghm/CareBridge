const express = require('express');
const sequelize = require('./config'); // Import the Sequelize instance from your config file

// Create an Express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Import your routes
const authRoutes = require('./routes/auth'); // Import your authentication routes
app.use('/api/auth', authRoutes); // API route for authentication

// Start the server
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
