const Admin = require('../../../models/admin');

module.exports.getAdminById = (req, res, next, id) => {
    Admin.findById(id).exec((err, admin) => {
        if (err || !admin) {
          return res.status(400).json({
            error: "no admin match found"
          });
        }
        req.profile = admin;
        next();
    });
}
