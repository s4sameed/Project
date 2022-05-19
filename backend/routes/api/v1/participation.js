const express = require('express');
const router = express.Router();

const { createParticipation } = require('../../../controllers/api/v1/participation');


//create
router.post('/create', createParticipation);


module.exports = router;