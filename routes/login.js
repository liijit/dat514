const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

usernameQueryAccount = (e) => {
    //return a promise value based on the corresponding value passed in
     return new Promise((resolve, reject) => {
        //query user database with the parsed values for the relevant account
            return user.findOne(({
                $or: [{
                        username: {
                            $regex: e
                        }
                    },
                    {
                        email: {
                            $regex: e
                        }
                    }
                ]
            }),
            (err, obj) => {
                //findOne parses account object or a "null" response if the query fails
                //compares the parsed object username and email with req.body request data
                if(obj === null || obj === undefined){
                    reject({msg: "User doesn't exist"})
                } else if (e === obj.username || e === obj.email) {
                    resolve(obj)
                } else {
                	reject({msg: 'Invalid Credentials'})
                }
                
            })
        })
}

passwordMatch = (...args) => {
	return new Promise(async(resolve, reject) => {
		//compares the hashed password with the user password request
		res = await bcrypt.compare(args[0], args[1].password)
		if (!res) {
			reject({msg: 'Incorrect credentials'})

		} else {
			resolve({msg: 'Authenticated successfully'})
		}
	})
}

jwttoken = e => {
	return new Promise(async(resolve, reject) => {	
		//creates a token, based on the user mongo id and assign the value to a variable
		//encodes the account id with a time signature
		//the 'JWT_SECRET' reference is a randomised string of characters that is used to authenticate requests to the backend
		const token = jwt.sign({ id: e._id }, process.env.JWT_SECRET);
		resolve({
			token, user: { id: e._id, email: e.email }
		})

	})
}

router.post('/', (req, res) => {
	//initialise variables and apply defined keys from post request
	const data = { username, password } = req.body;
    const loginAsync = async () => {
    //anything below each await statement is added to a 'microtask' queue
    //executes each function in a sequence, returns promise values from functions
        await fieldValidator(data);
        userObject = await usernameQueryAccount(data.username);
        await passwordMatch(data.password, userObject);
        return await jwttoken(userObject);
    }

    loginAsync()
    .then(result => {
    	//return object 
    	res.send(result)
    })
    .catch(err => {
            //err returns the rejected reason message specified in the validators
            res.status(500).json(err)
        })
})

module.exports = router;