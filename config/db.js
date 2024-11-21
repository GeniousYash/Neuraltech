const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURL).then(function(){
    console.log('Connected to MongoDB');
});

module.exports = mongoose.connection;