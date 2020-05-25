const router = require('express').Router();
const user = require('../models/user.model');

router.route('/').get((req, res) => {
    user.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

function existenceLoop(e) {
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
                    console.log('test')
                if(obj === null){
                    return resolve(e+' doesnt exist')
                } else {
                    return reject('User already exists')
                }
            })
        })
}

function dbExistenceValidator(...args) {
    const proms = [];
    //iterate through the 'args' array and push promise states to 'proms' array
    for(let i = 0; i < args.length; i++) {
        proms.push(existenceLoop(args[i]))
    }
    //returns a state
    return Promise.all(proms)
}

function emailValidator(e) {
    //return a promise value based on the corresponding value passed in
    return new Promise((resolve, reject) => {
        //checks that both "@" and "." ares in the email string
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
            if (args[i] === null) {
                return reject('Fill in all Fields')
            }
        }
    })
}

router.route('/').post((req, res) => {
    //initialise variables and apply defined keys from post request
    const { username, email, password } = req.body;
    let prom1, prom2, prom3
    //assign returned promise values to the variables
    prom1 = fieldValidator(username, email, password);
    prom2 = emailValidator(email);
    prom3 = dbExistenceValidator(username, email);
    //waits for all promises to be fulfilled before proceeding to .then
    Promise.all([prom1, prom2, prom3]) 
        .then(result => {
            console.log(result)
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