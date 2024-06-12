const mongoose = require('mongoose');

const mongodbURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose Connected');
}).catch((err) => {
    console.error('Mongoose Connection error:', err);
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Mongoose Connection error:', err);
});

db.on('disconnected', () => {
    console.log('Mongoose Disconnected');
});

module.exports = db;
