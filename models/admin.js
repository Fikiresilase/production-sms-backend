const mongoose= require('mongoose');
const adminSchema = mongoose.Schema ({
    controll: String ,
    name: String ,
    email: String ,
    password: String ,
   


})
const Admin= new mongoose.model('Admin',adminSchema)

module.exports.adminSchema = adminSchema
module.exports.Admin = Admin