const express = require('express')
const {School} =require('../models/school')
const {schoolSchema} = require('../models/school')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const school=await School.find().sort()
        res.send(school)
        
})
router.get('/:id',async(req,res)=> {
    const school=await School.find({_id:req.params.id}).sort({name:1})
    if(!school) return
    res.send(school)
    
})





router.post('/',async(req,res)=> {
    const school=await new School({
        name:req.body.name,
        branches: req.body.branches
    

    })
    const addedschool= await school.save()
    res.send(addedStudent)
    
})

router.put('/:id',async(req,res)=> {
    const school=await School.findById({_id:req.params.id}).sort({name:1})
    if(!school) return
    if(req.body.name) {
        school.name=req.body.name
    }
    if(req.body.branches) {
        school.branches=req.body.branches
    }
   
    let result = school.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const school= await School.findByIdAndRemove(req.params.id)
    if(!school) return
    res.send(school)


})


module.exports = router;