const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const IMG_PATH = path.join("/uploads/participant")

var participation = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        
        gender: {
            type: String,
            required: true,
            trim: true
        },

        studentId: {
            type: Number,
            unique: true,
            required: true,
            trim: true
        },

        contact:{
            type: Number,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
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



participation.statics.uploadParticipantIMG = multer({
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


participation.statics.participantIMGPath = IMG_PATH;


module.exports = mongoose.model("Participation", participation);