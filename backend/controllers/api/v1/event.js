const Event = require('../../../models/event');
const fs = require('fs');
const path = require("path");

exports.getEventById = (req, res, next, id) => {
    Event.findById(id)
    .populate("organizer")
    .exec((err, event) => {
        if (err || !event) {
          return res.status(400).json({
            error: "no event found"
          });
        }
        req.event = event;
        next();
    });
}


exports.createEvent = (req, res) => {
    let event = new Event();
    console.log(req.body)
    try {
      Event.uploadEventIMG(req, res, (err) => {
        if (err) {
            console.log("*****MULTER-ERROR*******", err)
            return;
        }

        event.name = req.body.name;
        event.description = req.body.description;
        event.date = req.body.date;
        event.organizer = req.body.organizer;
        event.venue = req.body.venue,
        event.photo = Event.eventIMGPath + '/' + req.file.filename;

        event.save();

        return res.status(200).json({
            message: `${event.name} created successfully`
        });

    })
    } catch (error) {
      console.log(error);
    }
}


exports.getEvent = (req, res) => {
  return res.json(req.event);
}



exports.deleteEvent = (req, res) => {
  let event = req.event;
    fs.unlinkSync(path.join(__dirname, '../../../', event.photo));
    event.remove((err, event) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the event"
            });
        }
        res.json({
            message: `${event.name} deleted successfully`,
        });
    });
}

exports.updateEvent = (req, res) => {
  let event = req.event;

    Event.uploadEventIMG(req, res, (err) => {
        if (err) {
            console.log("*****MULTER-ERROR*******", err)
            return;
        }

        event.name = req.body.name;
        event.description = req.body.description;
        event.date = req.body.date;
        event.organizer = req.body.organizer;
        event.venue = req.body.venue;


        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../../../', event.photo));
            event.photo = Event.eventIMGPath + '/' + req.file.filename;
        }

        event.save();
        return res.status(200).json({
            message: `${event.name} updated successfully`
        });

    })
}



module.exports.getAllEvents = (req, res) => {
    Event.find()
        .populate("organizer")
        .exec((err, events) => {
            if (err) {
                return res.status(400).json({
                    error: "No events found"
                });
            }
            res.json(events);
        });
};