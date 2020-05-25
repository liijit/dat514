const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();

const app = express();

//the 'dotenv' module grabs assigned variables from the current directory '.env' file, which is used for local development port options
//variables are assigned with these values
//heroku also takes advantage of this method and will use their own determined port number
const port = process.env.PORT;
const uri = process.env.MONGOCOMPASS_URI || process.env.MONGOATLAS_URI;

//initialise and assign variables with route files
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')

//exposes incoming json requests to the req.body 
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Listening @ ${port}`);
})

//let express assign a middleware address to each route
app.use('/login', loginRouter);
app.use('/register', registerRouter);

//heroku will have set 'NODE_ENV' value to 'production'
//this will build our front end react app when pushing the entire project
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
}

//attempt connection to database using mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            throw err.message
            process.exit(1);
        }
        console.log("MongoDB database connection established successfully");
    }
);

app.get('/', (req, res) => {
    res.send('Homepage');
})