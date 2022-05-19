const mongoose = require('mongoose');

const DB = process.env.DB;

mongoose.connect(DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{
    console.log("DATABASE CONNECTED");
});

const db = mongoose.connection;

module.exports = db;