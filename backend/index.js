require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

//DB
const db = require('./config/db-config');


const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


app.use('/uploads', express.static('uploads'))

//express-router
app.use('/', require('./routes'));


app.listen(PORT, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${PORT}`);
});