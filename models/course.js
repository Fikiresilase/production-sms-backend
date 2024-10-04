const mongoose= require('mongoose');
const courseSchema = mongoose.Schema({
    name:String ,
    grade: String,
    addedToAverage: Boolean
})
const Course = new mongoose.model('course',courseSchema)
module.exports.courseSchema = courseSchema
module.exports.Course = Course