const mongoose= require('mongoose');
const parentSchema=mongoose.Schema({
    name:String ,
    email: String ,
    password: String ,
    
})
const Parent= new mongoose.model('parent',parentSchema)
module.exports.parentSchema = parentSchema
module.exports.Parent = Parent