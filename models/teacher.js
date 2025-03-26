const mongoose= require('mongoose');
const teacherSchema = mongoose.Schema({
    name:String ,
    email: String ,
    password: String ,
    grade: [
       {
        section: [String],
        course: [{
            id: [mongoose.Schema.Types.ObjectId],
            name: String
        }],
        name:Number        

    } ]
    
  
})
const Teacher = new mongoose.model('teacher',teacherSchema)

module.exports.teacherSchema = teacherSchema
module.exports.Teacher = Teacher