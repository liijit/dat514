const router = require('express').Router();
const bcrypt = require('bcryptjs');
const user = require('../models/user.model');

existenceValidator = (...args) => {
    //return a promise value based on the corresponding value passed in
     return new Promise((resolve, reject) => {
        //query user database with the parsed values for the relevant account
            user.findOne(({
                $or: [{
                        username: {
                            $regex: args[0]
                        }
                    },
                    {
                        email: {
                            $regex: args[1]
                        }
                    }
                ]
            }), (err, obj) => {
                //findOne parses account object or a "null" response if the query fails
                //compares the parsed object username and email with req.body request data
                if(obj === null){
                    resolve('User doesnt exist')
                } else if (args[0] === obj.username) {
                    reject('User already exists')
                } else if (args[1] === obj.email) {
                    reject('Email is already registered') 
                }
            })
        })
}

emailValidator = (e) => {
    //return a promise value based on the corresponding value passed in
    return new Promise((resolve, reject) => {
        //checks that both "@" and "." are within the parsed argument
        if (e.includes('@', '.') === true) {
            resolve('Correct email format')
        } else {
            reject('Incorrect email format')
        }
    })
}

fieldValidator = (...args) => {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < args.length; i++){
            //if a parsed argument is empty, revoke
            if (args[i] === "") {
                reject('Missing Fields')
            } else {
                resolve('Fields Fulfilled')
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

passwordValidator = (...args) => {
    let prom1 = new Promise((resolve, reject) => {
        if(args[0].length < 5) {
            reject('Password must be longer then 5 characters')
        } else {
            resolve('Password length valid')
        }
    })

    let prom2 = new Promise((resolve, reject) => {
        if(args[0] !== args[1]) {
            reject("Passwords don't match")
        } else {
            resolve('Passwords match')
        }
    })
    //returns a promise state
    return Promise.all([prom1, prom2])
}

passwordHash = async (e) => {
    //generate a salt and hash the plain password
        const salt = await bcrypt.genSalt();
        return passHash = await bcrypt.hash(e, salt)
            .then(res => {
                return res
            })
    }

router.post('/', (req, res) => {
    //initialise variables and apply defined keys from post request
    const { username, email, password, passwordVal } = req.body;
    const registerAsync = async () => {
    //anything below each await statement is added to a 'microtask' queue
    //executes each function in a sequence, returns promise values from functions
        await fieldValidatorLoop(username, email, password, passwordVal);
        await existenceValidator(username, email);
        await emailValidator(email);
        await passwordValidator(password, passwordVal);
        await passwordHash(password);
    }

    registerAsync()
        .then(result => {
            let newAccount = new user({ username, email, password:passHash })
            newAccount.save()
            //Adds the user to the accounts database
                .then(() => res.json('User {'+username+'} added!'))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            //err returns the rejected reason message specified in the validators
            res.status(500).json(err)
        })
})

module.exports = router;