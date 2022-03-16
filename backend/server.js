const app = require('./app');

const dotenv = require('dotenv');
const { connectDatabase } = require('./config/database');

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
})

// Config
dotenv.config({ path: 'backend/config/config.env' });

// Connecting to Database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
});

// Unhandle Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhande Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});