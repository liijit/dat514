const router = require('express').Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

router.get('/', auth, async (req, res) => {
    try {
        //auth executes the middleware verification and passes values such as 'req.user' if successful
        //respond with an object of the user
        const userData = await user.findById(req.user)
        res.json({
            id: userData._id,
            username: userData.username,
            email: userData.email,
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        //find and delete the user with the corresponding id
        const deleteUser = await user.findByIdAndDelete(req.user);
        res.json({msg: 'Deleted ' + deleteUser.email})
    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.post('/tokenValidate', async (req, res) => {
    try {
        //grab the the token thats parsed into the header, assign it to 'token'
        const token = req.header('x-auth-token');
        if (!token) return res.json(false)

        //verify that token is correct and apply the result to 'verified'
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        //find user 
        const userData = await user.findById(verified.id)
        if (!userData) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json(err.message)
    }
});

module.exports = router;