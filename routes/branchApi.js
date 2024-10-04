const express = require('express')
const {Branch} =require('../models/branch')
const {branchSchema} = require('../models/branch')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const branch=await Branch.find().sort()
        res.send(branch)
        
})
// router.get('/:id',async(req,res)=> {
//     const branch=await Branch.find({_id:req.params.id}).sort({name:1})
//     if(!branch) return
//     res.send(branch)
    
// })






router.post('/',async(req,res)=> {
    const branch=await new Branch({
        name:req.body.name,
        student: req.body.email ,
        parent:req.body.parent,
        teacher:req.body.teacher,
        admin:req.body.admin,
    })
    const addedbranch= await branch.save()
    res.send(addedbranch)
    
})

router.put('/:id',async(req,res)=> {
    const branch=await Branch.findById({_id:req.params.id}).sort({name:1})
    if(!branch) return
    if(req.body.name) {
        branch.name=req.body.name
    }
    if(req.body.student) {
        branch.student=req.body.student
    }
    if(req.body.teacher) {
        branch.teacher=req.body.teacher
    }
    if(req.body.parent) {
        branch.parent=req.body.parent
    }
    if(req.body.admin) {
        branch.admin=req.body.admin
    }
   
    let result = parent.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const branch= await Branch.findByIdAndRemove(req.params.id)
    if(!branch) return
    res.send(branch)


})


module.exports = router;