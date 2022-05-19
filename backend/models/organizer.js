const mongoose = require("mongoose");

var organizer = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            maxlength: 32,
            trim: true
        },

    },
    { timestamps: false }
);



module.exports = mongoose.model("Organizer", organizer);