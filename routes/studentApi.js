const express = require('express')
const {Student} =require('../models/student')
const studentSchema = require('../models/student')

const router  = express.Router()
router.use(express.json())
router.get('/',async(req,res)=> {
        const students=await Student.find()
        res.send(students)
        
})
router.get('/:id',async(req,res)=> {
    const students=await Student.find({_id:req.params.id}).sort({name:1})
    if(!students) return
    res.send(students)
    
})

router.get('/:grade',async(req,res)=> {
    const students=await Student.find({grade:req.params.grade}).sort({name:1})
    if(!students) return
    res.send(students)
    
})

router.get('/:section',async(req,res)=> {
    const students=await Student.find({section:req.params.section}).sort({name:1})
    if(!students) return  
    res.send(students)
    
})

router.post('/',async(req,res)=> {
    const student=await new Student({
        name:req.body.name,
        email: req.body.email ,
        grade :req.body.grade,
        section : req.body.section ,
        password:req.body.password,
        parent :req.body.parent
    

    })
    const addedStudent= await student.save()
    res.send(addedStudent)
    
})

router.put('/:id',async(req,res)=> {
    const student=await student.findById({_id:req.params.id}).sort({name:1})
    if(!student) return
    if(req.body.name) {
        student.name=req.body.name
    }
    if(req.body.email) {
        student.email=req.body.email
    }
    if(req.body.grade) {
        student.grade=req.body.grade
    }
    if(req.body.section) {
        student.section=req.body.section
    }
    if(req.body.parent) {
        student.parent=req.body.parent
    }
    if(req.body.password) {
        student.password=req.body.password
    }
    let result = student.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const student= await Student.findByIdAndRemove(req.params.body)
    if(!student) return
    res.send(student)

})

module.exports= router