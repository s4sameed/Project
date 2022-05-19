const express = require('express');
const router = express.Router();

const { getEventById, createEvent, getEvent, deleteEvent, updateEvent, getAllEvents } = require('../../../controllers/api/v1/event');

const { isAuthenticated } = require("../../../controllers/api/v1/auth");
const { getAdminById } = require("../../../controllers/api/v1/admin");

router.param('adminId', getAdminById);
router.param('eventId', getEventById);

//create
router.post('/create/:adminId', isAuthenticated, createEvent);


//read
router.get("/fetch/:eventId", getEvent);


//read-all
router.get("/fetch-all", getAllEvents);


//update
router.put('/update/:eventId/:adminId', isAuthenticated, updateEvent)


//delete
router.delete('/delete/:eventId/:adminId', isAuthenticated, deleteEvent);


module.exports = router;