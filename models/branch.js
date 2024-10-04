const mongoose= require('mongoose');

const branchSchema=mongoose.Schema({
    name:String ,
    student: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'student'
    } ,
    teacher: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'student'
    } ,
    parent: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'student'
    } ,

    admin : {
        type: mongoose.Schema.Types.ObjectId ,
        ref :'branch',
    }
})
const Branch= new mongoose.model('branch',branchSchema)

module.exports.branchSchema = branchSchema
module.exports.Branch = Branch