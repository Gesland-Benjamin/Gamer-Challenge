// This file initializes and exports the Sequelize database connection.
// It loads environment variables, configures Sequelize options, and authenticates the connection.
// The configuration includes logging, timestamps, and naming conventions for the database tables.

import 'dotenv/config';
import { Sequelize } from "sequelize";

// Connect the database to the ORM
// Define the database architecture and options
export const sequelize = new Sequelize(
    process.env.DB_URL, // Database URL from environment variables
    {
        logging: false, // Disable Sequelize console logging
        define: {
            createdAt: "created_at", // Use 'created_at' for creation timestamp
            updatedAt: "updated_at", // Use 'updated_at' for update timestamp
            underscored: true, // Use snake_case for table and column names
        }
    }
);

try {
    // Test the database connection
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully. ✅");
} catch (error) {
    // Handle connection errors
    console.error("Unable to connect to the database.❌")
};