const mongoose = require("mongoose");

var admin = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 32,
            trim: true
        },
        
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        collegeID: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            trim: true
        }

    },
    { timestamps: false }
);



module.exports = mongoose.model("Admin", admin);