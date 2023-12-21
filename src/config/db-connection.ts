import server from '@src/app.js';
import mongoose from 'mongoose';

const connectToDatabase = () => {
  const DB = 'url_to_Database';
  mongoose
    .connect(`${DB}/MongoPractice`)
    .then((data) => console.log(`> ${data.connection.name} db connected`))
    .catch((error) => {
      console.log({
        error: error.message,
        message: 'Shutting down the server due to error in connecting database',
      });
      server.close(() => {
        console.log('Server closed, Exiting node process');
        process.exit();
      });
    });
};

export default connectToDatabase;
