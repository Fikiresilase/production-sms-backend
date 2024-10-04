const mongoose= require('mongoose');
const schoolSchema = mongoose.Schema({
    name:String ,
    branches : {
        type: [mongoose.Schema.Types.ObjectId] ,
        ref :'branch',
    }
})
const School= new mongoose.model('school',schoolSchema)

module.exports.schoolSchema = schoolSchema
module.exports.School = School