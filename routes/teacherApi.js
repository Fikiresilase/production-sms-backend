const express = require('express')
const {Teacher} =require('../models/teacher')
const {teacherSchema} = require('../models/teacher')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const teacher=await Teacher.find()
        res.send(teacher)
        
})
router.get('/:id',async(req,res)=> {
    const teacher=await Teacher.find({_id:req.params.id}).sort({name:1})
    if(!teacher) return
    res.send(teacher)
    
})





router.post('/',async(req,res)=> {
    const teacher=await new Teacher({
        name:req.body.name,
        email: req.body.email ,
        grade :req.body.grade,
        section : req.body.section ,
        password:req.body.password,
        parent :req.body.parent
    

    })
    const addedTeacher= await teacher.save()
    res.send(addedStudent)
    
})

router.put('/:id',async(req,res)=> {
    const teacher=await Teacher.findById({_id:req.params.id}).sort({name:1})
    if(!teacher) return
    if(req.body.name) {
        teacher.name=req.body.name
    }
    if(req.body.email) {
        teacher.email=req.body.email
    }
    if(req.body.password) {
        teacher.password=req.body.password
    }
    let result = teacher.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const teacher= await Teacher.findByIdAndRemove(req.params.id)
    if(!teacher) return
    res.send(teacher)


})


module.exports = router;