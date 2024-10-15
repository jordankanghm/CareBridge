const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new instance of Sequelize with PostgreSQL connection details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres', // Specify the database dialect
    port: process.env.DB_PORT, // Default PostgreSQL port
    logging: false, // Disable logging; can be set to console.log to enable
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
