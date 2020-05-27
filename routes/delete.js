const router = require('express').Router();
const auth = require('../middleware/auth');
const user = require('../models/user.model');

router.delete('/', auth, async (req, res) => {
	try {
		//find and delete the user with the corresponding id
		const deleteUser = await user.findByIdAndDelete(req.user);
		res.json('Deleted '+deleteUser.email) 	
	} catch (err) {
        res.status(500).json(err.message)
    }
});

module.exports = router;