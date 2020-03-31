const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

mongoose.set('useCreateIndex', true);
mongoose
    .connect(
        'mongodb+srv://babytaetae:babytaetae@cluster0-3ffi4.azure.mongodb.net/', 
        { useNewUrlParser: true, useUnifiedTopology: true, connectWithNoPrimary: true})
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;