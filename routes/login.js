const router = require('express').Router();
const user = require('../models/user.model');

router.route('/').get((req, res) => {
    user.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').post((req, res) => {
   
})

module.exports = router;