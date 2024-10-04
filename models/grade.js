const mongoose= require('mongoose');
const gradeSchema = mongoose.Schema({
    label:Number,
    section:[String],
    course: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'course'
    }

})
const Grade = new mongoose.model('grade',gradeSchema)
module.exports.gradeSchema = gradeSchema
module.exports.Grade = Grade