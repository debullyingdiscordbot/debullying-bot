const mongoose = require('mongoose');

module.exports = {
  init: () => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(process.env.MONGODB, options);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      console.log('Connected to db.');
    });

    mongoose.connection.on('err', (err) => {
      console.error(`Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on('reconnecting', () => {
      console.log('Reconnecting..');
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection lost');
    });
  },
};
