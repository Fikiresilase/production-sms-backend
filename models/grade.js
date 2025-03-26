const mongoose= require('mongoose');
const gradeSchema = mongoose.Schema({
    label:Number,
    section:[String],
    course: {
        name: String,
        addedToAverage: Boolean
    }

})
const Grade = new mongoose.model('grade',gradeSchema)
module.exports.gradeSchema = gradeSchema
module.exports.Grade = Grade