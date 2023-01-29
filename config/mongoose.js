const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/polling-api');  //localhost == 127.0.0.1
 
const db = mongoose.connection;

// console.log(db);

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', () => {
    console.log('Connected to Database : MongoDB');
});

module.exports = db;
