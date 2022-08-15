const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../Controllers/WorkoutController')
const requireAuth = require('../Middleware/requireAuth')

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)

//get all workouts
router.get('/', getWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post a new workout
router.post('/', createWorkout)

//delete a single workout
router.delete('/:id', deleteWorkout)

//UPDATE a single workout
router.patch('/:id', updateWorkout)

module.exports = router; 