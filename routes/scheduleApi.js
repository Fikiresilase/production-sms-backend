const express = require('express')
const { Schedule } = require('../models/schedule')
const router = express.Router()


router.get('/', async (req, res) => {

    const schedule = await Schedule.find()
    res.send(schedule)

})

router.get('/:teacher', async (req, res) => {
    const schedule = await Schedule.find({ teacherId: req.params.teacher }) 
    console.log(schedule) 
    res.send(schedule) 
}) 

module.exports =router
