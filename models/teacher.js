const mongoose= require('mongoose');
const teacherSchema = mongoose.Schema({
    name:String ,
    email: String ,
    password: String ,
    grade:String ,
    section:String ,
  
})
const Teacher = new mongoose.model('teacher',teacherSchema)

module.exports.teacherSchema = teacherSchema
module.exports.Teacher = Teacher