const mongoose= require('mongoose');
const studentSchema=mongoose.Schema({
    name:String ,
    email: String ,
    grade : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'grade',
    } ,
    section : String,
    password: String,
    parent : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'parent',
    } ,
   
})
const Student = mongoose.model('student',studentSchema)

module.exports.Student= Student
module.exports.studentSchema=studentSchema