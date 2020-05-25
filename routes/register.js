const router = require('express').Router();
const user = require('../models/user.model');

router.route('/').get((req, res) => {
    user.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

function existenceValidator(e) {
    //return a promise value based on the corresponding value passed in
     return new Promise((resolve, reject) => {
        //query user database with the parsed values for the relevant account
            user.findOne(({
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
            }), (err, obj) => {
                //findOne parses account object or a "null" response if the query fails 
                if(obj === null){
                    return resolve(e+' doesnt exist')
                } else {
                    return reject('User already exists')
                }
            })
        })
}

function existenceValidatorLoop(...args) {
    const proms = [];
    //iterate through the 'args' array and push promise states to 'proms' array
    for(let i = 0; i < args.length; i++) {
        proms.push(existenceValidator(args[i]))
    }
    //returns a state
    return Promise.all(proms)
}

function emailValidator(e) {
    //return a promise value based on the corresponding value passed in
    return new Promise((resolve, reject) => {
        //checks that both "@" and "." are within the parsed argument
        if (e.includes('@', '.') === true) {
            return resolve('Correct email format')
        } else {
            return reject('Incorrect email format')
        }
    })
}

function fieldValidator(...args) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < args.length; i++){
            //if a parsed argument is empty, revoke
            if (args[i] === "") {
                return reject('Missing Fields')
            } else {
                return resolve('Fields Fulfilled')
        }
        }
    })
}

function fieldValidatorLoop(...args) {
    const proms = [];
    //iterate through the 'args' array and push promise states to 'proms' array
    for(let i = 0; i < args.length; i++) {
        proms.push(fieldValidator(args[i]))
    }
    //returns a state
    return Promise.all(proms)
}

router.post('/', (req, res) => {
    //initialise variables and apply defined keys from post request
    const { username, email, password } = req.body;
    const checkerAsync = async () => {
    //anything below each await statement is added to a 'microtask' queue
    //executes each function in a sequence, returns promise values from functions
        await fieldValidatorLoop(username, email, password);
        await emailValidator(email);
        await existenceValidatorLoop(username, email);
    }
    checkerAsync()
        .then(result => {
            console.log('User added!')
            let newAccount = new user({ username, email, password })
            newAccount.save()
            //Adds the user to the accounts database
                .then(() => res.json('User added!'))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            //err returns the rejected reason message specified in the validators
            res.send(err)
        })
})

module.exports = router;