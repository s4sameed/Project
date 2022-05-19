const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.send('<h1>Hello</h1>');
})

router.use('/auth', require('./auth'));
router.use('/organizer', require('./organizer'));
router.use('/event', require('./event'));
router.use('/participation', require('./participation'));



module.exports = router;