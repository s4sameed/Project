const Admin = require('../../../models/admin');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.register = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const admin = new Admin(req.body);
    admin.save((err, admin) => {
        if (err) {
            return res.status(400).json({
                error: "SignUp Unsuccessful (This username is taken. Try another)"
            });
        }

        res.json({
            id: admin._id,
            username: admin.username,
            email: admin.email,
            collegeID: admin.collegeID,
            password: admin.password
        });
    });
}



exports.login = (req, res)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const {username, password} = req.body;

    Admin.findOne({username}, (err, admin)=>{
        if (err || !admin) {
            return res.status(400).json({
                error: "No matching record"
            });
        }

        if (admin.password != password) {
            return res.status(401).json({
                error: "Wrong Credentials"
            });
        }

        const token = jwt.sign({ _id: admin._id }, process.env.SECRET);

        res.cookie("token", token, { expire: new Date() + 9999 });


        res.json({
            token, admin:{
                id: admin._id,
                username: admin.username,
                email: admin.email,
                collegeID: admin.collegeID,
                password: admin.password,
            }
        });

    })
}


exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "logout successful"
    })
}


//middleware to check logged in or not
exports.isAuthenticated = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "authentication"
});