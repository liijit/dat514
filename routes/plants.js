const router = require('express').Router();
const axios = require('axios')
const auth = require('../middleware/auth');
const Plant = require('../models/plants.model')

router.post('/auth', auth, async (req, res) => {
    try {
        //trefle will return a jwt signed token by using private access token
        //it is safe to use this on our front end of the application without exposing our private key  
        const trefleToken = await axios.post('https://trefle.io/api/auth/claim?token=' + process.env.TREFLE_SECRET + '&origin=localhost')
        //send auth token back to the user
        res.send(trefleToken.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try {
        Plant.find()
            .sort({ date: -1 })
            .then(plants => res.json(plants));
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
	 const newPlant = new Plant({
	 	name: req.body.name
	 });
	 newPlant.save().then(result => res.json(result));
})

router.delete('/:id', (req, res) => {
	Plant.findById(req.params.id)
	.then(plant => plant.remove()
		.then(() => res.json(true)))
		.catch(err => res.status(500).json(false))
})

router.post('/queryList', async (req, res) => {
    try {
        const { name } = req.body;
        //trefle will return a jwt signed token by using private access token
        const trefleToken = await axios.post('https://trefle.io/api/auth/claim?token=' + process.env.TREFLE_SECRET + '&origin=localhost');
        //with the correct token, search the requested item in Trefle's database
        const query = await axios.get('https://trefle.io/api/plants?q=' + name + '&token=' + trefleToken.data.token);

        //create an array and assign 'items' with object value parameters 
        let ee = []
        let items = Object.values(query.data)

        //A function that changes the first character index of each word to an upper case 
        const charZeroUpperCase = (phrase) => {
            return phrase
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        // loops through array of items and push to array
        for (i = 0; i < items.length; i++) {
            if (items[i].common_name === null) {
                i++
            } else {
                a = charZeroUpperCase(items[i].common_name)
                ee.push(a)
            }
        }
		//remove duplicate items before response
        res.json(Array.from(new Set(ee)))
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;