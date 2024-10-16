const express = require('express');
const sequelize = require('./config'); // Import the Sequelize instance from your config file

// Create an Express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Import your routes
const authRoutes = require('./routes/auth'); // Import your authentication routes
app.use('/api/auth', authRoutes); // API route for authentication

const reqRoutes = require('./routes/requests');
app.use('/api/requests', reqRoutes);

// Sync database model
sequelize.sync({ alter: true }) // This will create/update tables if they exist
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Start the server
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
