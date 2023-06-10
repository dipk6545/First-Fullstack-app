const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongo Success complete');
    })
    .catch((e) => {
      console.log('Connection Failed', e);
    });
};

module.exports = connectToMongo;
