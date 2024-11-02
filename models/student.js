const mongoose= require('mongoose');
const studentSchema=mongoose.Schema({
    name:String ,
    email: String ,
    grade : {
        id: mongoose.Schema.Types.ObjectId,
        name:Number
        
    } ,
    section: String,
    course: [
        {
          id: mongoose.Schema.Types.ObjectId,
          name: String,
          grade: Number
        }
      ],
    password: String,
    parent : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'parent',
    } ,
   
})
const Student = mongoose.model('student',studentSchema)

module.exports.Student= Student
module.exports.studentSchema=studentSchema