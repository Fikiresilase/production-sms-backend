const express = require('express')
const {Admin} =require('../models/admin')
const {adminSchema} = require('../models/admin')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const admin=await Admin.find()
        res.send(admin)
        
})
router.get('/:id',async(req,res)=> {
    const admin=await Admin.find({_id:req.params.id}).sort({name:1})
    if(!admin) return
    res.send(admin)
    
})





router.post('/',async(req,res)=> {
    const admin=await new Admin({
        name:req.body.name,
        email: req.body.email ,
        controll :req.body.grade,
        password:req.body.password,
        
    

    })
    const addedadmin= await admin.save()
    res.send(addedStudent)
    
})

router.put('/:id',async(req,res)=> {
    const admin=await admin.findById({_id:req.params.id}).sort({name:1})
    if(!admin) return
    if(req.body.controll) {
        admin.controll=req.body.controll
    }
    if(req.body.name) {
        admin.name=req.body.name
    }
    if(req.body.email) {
        admin.email=req.body.email
    }
    if(req.body.password) {
        admin.password=req.body.password
    }
    let result = admin.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const admin= await Admin.findByIdAndRemove(req.params.id)
    if(!admin) return
    res.send(admin)


})


module.exports = router;