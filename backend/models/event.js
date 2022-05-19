const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const IMG_PATH = path.join("/uploads/events")

const event = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },

        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000
        },

        date: {
            type: Date,
            required: true,
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
            required: true
        },
        
        venue: {
            type: String,
            required: true,
            trim: true
        },

        photo: {
            type: String,
        }
    },
    { timestamps: false }
);



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', IMG_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});




//static methods 
event.statics.uploadEventIMG = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
}).single('photo');


event.statics.eventIMGPath = IMG_PATH;


module.exports = mongoose.model("Event", event);


