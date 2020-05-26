const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

queryAccount = (...args) => {
    //return a promise value based on the corresponding value passed in
     return new Promise((resolve, reject) => {
        //query user database with the parsed values for the relevant account
            return user.findOne(({
                $or: [{
                        username: {
                            $regex: args[0]
                        }
                    },
                    {
                        email: {
                            $regex: args[0]
                        }
                    }
                ]
            }),
            (err, obj) => {
                //findOne parses account object or a "null" response if the query fails
                //compares the parsed object username and email with req.body request data
                if(obj === null || obj === undefined){
                    reject("User doesn't exist")
                } else if (args[0] === obj.username || args[0] === obj.email) {
                    resolve(obj)
                } else {
                	reject('Invalid credentials')
                }
                
            })
        })
}

fieldValidator = (...args) => {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < args.length; i++){
            //if a parsed argument is empty, revoke
            if (args[i] === "" || args[i] === undefined) {
                reject('Missing fields')
            } else {
                resolve('Fields fulfilled')
        }
        }
    })
}

fieldValidatorLoop = (...args) => {
    const proms = [];
    //iterate through the 'args' array and push promise states to 'proms' array
    for(let i = 0; i < args.length; i++) {
        proms.push(fieldValidator(args[i]))
    }
    //returns a promise state
    return Promise.all(proms)
}

passwordMatch = (...args) => {
	return new Promise(async(resolve, reject) => {
		//compares the hashed password with the user password request
		res = await bcrypt.compare(args[0], args[1].password)
		if (!res) {
			reject('Incorrect credentials')
		} else {
			resolve('Authenticated successfully')
		}
	})
}

jwttoken = (...args) => {
	return new Promise(async(resolve, reject) => {	
		//creates a token, based on the user mongo id and assign the value to a variable
		//encodes the account id with a time signature
		//the 'JWT_SECRET' reference is a randomised string of characters that is used to authenticate requests to the backend
		const token = jwt.sign({ id: args[0]._id }, process.env.JWT_SECRET);
		resolve({
			token, user: { id: args[0]._id, email: args[0].email }
		})

	})
}

router.post('/',(req, res) => {
	//initialise variables and apply defined keys from post request
	const { username, password } = req.body;
    const loginAsync = async () => {
    //anything below each await statement is added to a 'microtask' queue
    //executes each function in a sequence, returns promise values from functions
        await fieldValidatorLoop(username, password);
        userObject = await queryAccount(username);
        await passwordMatch(password, userObject);
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