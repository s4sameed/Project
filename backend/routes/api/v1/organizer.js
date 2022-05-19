const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const { getOrganizerById, createOrganizer, getAllOrganizers, updateOrganizer, deleteOrganizer } = require("../../../controllers/api/v1/organizer");
const { isAuthenticated } = require("../../../controllers/api/v1/auth");
const { getAdminById } = require("../../../controllers/api/v1/admin");

router.param('adminId', getAdminById);
router.param('organizerId', getOrganizerById);


//create
router.post('/create/:adminId', isAuthenticated, createOrganizer);


//read
router.get('/fetch-all', getAllOrganizers);


//update
router.put('/update/:organizerId/:adminId', isAuthenticated, updateOrganizer);


//delete
router.delete('/delete/:organizerId/:adminId', isAuthenticated, deleteOrganizer);


module.exports = router;

