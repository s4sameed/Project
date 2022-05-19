const Organizer = require('../../../models/organizer');

const { validationResult } = require('express-validator');


exports.getOrganizerById = (req, res, next, id) => {
    Organizer.findById(id).exec((err, organizer) => {
        if (err || !organizer) {
          return res.status(400).json({
            error: "no organizer found"
          });
        }
        req.organizer = organizer;
        next();
    });
}


exports.createOrganizer = (req, res) => {
  const organizer = new Organizer(req.body);
  organizer.save((err, organizer) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save organizer"
      });
    }
    res.json({ organizer });
  });
}



module.exports.getAllOrganizers = (req, res) => {
  Organizer.find().exec((err, organizers) => {
    if (err) {
      return res.status(400).json({
        error: "No organizers found"
      });
    }
    res.json(organizers);
  });
};



exports.updateOrganizer = (req, res) => {
    const organizer = req.organizer;
    organizer.name = req.body.name;
  
    organizer.save((err, updatedOrganizer) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update organizer"
        });
      }
      res.json(updatedOrganizer);
    });
}


exports.deleteOrganizer = (req, res) => {
  const organizer = req.organizer;
  
    organizer.remove((err, organizer) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this organizer"
        });
      }
      res.json({
        message: `${organizer} deleted`
      });
    });
}