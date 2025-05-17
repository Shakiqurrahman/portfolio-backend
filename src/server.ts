import { Server } from 'http';
import { app } from './app';
import { config } from './config/config';

let server: Server;
async function main() {
    try {
        server = app.listen(config.PORT, () => {
            console.log(`✔ Server started at ${config.PORT} `);
        });
    } catch (err) {
        console.log('Error starting server:', err);
    }

    process.on('unhandledRejection', () => {
        console.log('❗Unhandled Rejection at:', new Date().toISOString());
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        }
        process.exit(1);
    });

    process.on('uncaughtException', () => {
        console.log('❗UncaughtException at:', new Date().toISOString());
        process.exit(1);
    });
}

main();
