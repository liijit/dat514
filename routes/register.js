const router = require('express').Router();
const bcrypt = require('bcryptjs');
const user = require('../models/user.model');

queryAccount = e => {
    //return a promise value based on the corresponding value passed in
     return new Promise((resolve, reject) => {
        //query user database with the parsed values for the relevant account
            user.findOne(({
                $or: [{
                        username: {
                            $regex: e.username
                        }
                    },
                    {
                        email: {
                            $regex: e.email
                        }
                    }
                ]
            }), (err, obj) => {
                //findOne parses account object or a "null" response if the query fails
                //compares the parsed object username and email with req.body request data
                if(obj === null){
                    resolve({msg: 'User doesnt exist'})
                } else if (e.username === obj.username) {
                    reject({msg: 'User already exists'})
                } else if (e.email === obj.email) {
                    reject({msg: 'Email is already registered'}) 
                }
            })
        })
}

emailValidator = e => {
    //return a promise value based on the corresponding value passed in
    return new Promise((resolve, reject) => {
        //checks that both "@" and "." are within the parsed argument
        if (e.includes('@', '.') === true) {
            resolve({msg: 'Correct email format'})
        } else {
            reject({msg: 'Incorrect email format'})
        }
    })
}

passwordValidator = e => {
    let prom1 = new Promise((resolve, reject) => {
        if(e.password.length < 5) {
            reject({msg: 'Password must be longer then 5 characters'})
        } else {
            resolve({msg: 'Password length valid'})
        }
    })

    let prom2 = new Promise((resolve, reject) => {
        if(e.password !== e.passwordVal) {
            reject({msg: "Passwords don't match"})
        } else {
            resolve({msg: 'Passwords match'})
        }
    })
    //returns a promise state
    return Promise.all([prom1, prom2])
}

passwordHash = async e => {
    //generate a salt and hash the plain password
        const salt = await bcrypt.genSalt();
        return passHash = await bcrypt.hash(e, salt)
            .then(res => {
                return res
            })
    }

router.post('/', (req, res) => {
    //initialise variables and apply defined keys from post request
    const data = { username, email, password, passwordVal } = req.body;
    const registerAsync = async () => {
    //anything below each await statement is added to a 'microtask' queue
    //executes each function in a sequence, returns promise values from functions
        await fieldValidator(data);
        await queryAccount(data);
        await emailValidator(data.email);
        await passwordValidator(data);
        await passwordHash(data.password);
    }

    registerAsync()
        .then(result => {
            let newAccount = new user({ username, email, password:passHash })
            newAccount.save()
            //Adds the user to the accounts database
                .then(() => res.json({msg: 'Registered User'}))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            //err returns the rejected reason message specified in the validators
            res.status(500).json(err)
        })
})

module.exports = router;