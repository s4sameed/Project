const Participation = require('../../../models/participation');

exports.createParticipation = (req, res) => {
    let participant = new Participation();
    try {
      Participation.uploadParticipantIMG(req, res, (err) => {
        if (err) {
            console.log("*****MULTER-ERROR*******", err)
            return;
        }

        participant.firstName = req.body.firstName;
        participant.lastName = req.body.lastName;
        participant.gender = req.body.gender
        participant.contact = req.body.contact;
        participant.year = req.body.year;
        participant.studentId = req.body.studentID,
        participant.event = req.body.event,
        participant.department = req.body.department

        participant.save();

        return res.status(200).json({
            message: `${participant.firstName} created successfully`
        });

    })
    } catch (error) {
      console.log(error);
    }
}