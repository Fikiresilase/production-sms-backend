const express = require('express')
const {Course} =require('../models/course')
const {courseSchema} = require('../models/course')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const course=await Course.find().sort()
        res.send(course)
        
})
router.get('/:id',async(req,res)=> {
    const course=await Course.find({_id:req.params.id}).sort({name:1})
    if(!course) return
    res.send(course)
    
})





router.post('/',async(req,res)=> {
    const course=await new Course({
        name:req.body.name,
    })
    const addedCourse= await course.save()
    res.send(addedCourse)
    
})

router.put('/:id',async(req,res)=> {
    const course=await Course.findById({_id:req.params.id}).sort({name:1})
    if(!course) return
    if(req.body.name) {
        course.name=req.body.name
    }
   
   
    let result = course.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const course= await Course.findByIdAndRemove(req.params.id)
    if(!course) return
    res.send(course)


})


module.exports = router;