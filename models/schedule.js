const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    teacherId: mongoose.Schema.Types.ObjectId,
    day: [
        {
            day: String,
            grade: String,
            section: String ,
            teacher: mongoose.Schema.Types.ObjectId,
            period: String,
            room: String,
            course:String,
            
        }
    ]
    
})

const Schedule = mongoose.model('schedule', scheduleSchema)
 

module.exports.Schedule = Schedule
module.exports.scheduleSchema=scheduleSchema