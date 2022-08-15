require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const workoutRoutes = require('./Routes/Workouts');
const userRoutes = require('./Routes/User');
// const buildPath = require('../frontend/build');


// express app constant
const app = express()

// Creating the middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workouts/', workoutRoutes)
app.use('/api/user', userRoutes)

//connect tothe Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for a requests on certain port number
        app.listen(process.env.PORT, () => {
            console.log('connected to the db and listening on port', process.env.PORT)
        })
        //connect to heroku
        if (process.env.NODE_ENV === 'production'){
            app.use(express.static(path.join(__dirname, './frontend/build')))

            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
            })
        } else {
            app.get(
            "/", (req, res) => {
                res.send("Api Running");
            }
            )
        }
    })
    .catch((error) => {
        console.log(error)
    })



process.env