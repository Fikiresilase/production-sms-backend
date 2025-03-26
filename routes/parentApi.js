const express = require('express')
const {Parent} =require('../models/parent')
const {parentSchema} = require('../models/parent')
const router  = express.Router() 



router.use(express.json())
router.get('/',async(req,res)=> {
        const parent=await Parent.find().sort()
        res.send(parent)
})
router.get('/:id',async(req,res)=> {
    const parent=await Parent.find({_id:req.params.id}).sort({name:1})
    if(!parent) return
    res.send(parent)
    
}) 

router.post('/',async(req,res)=> {
    const parent=await new Parent({
        name:req.body.name,
        email: req.body.email ,
        password:req.body.password,
    })
    const addedParent= await parent.save()
    res.send(addedParent)
    
})

router.put('/:id',async(req,res)=> {
    const parent=await Parent.findById({_id:req.params.id}).sort({name:1})
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
   
    let result = parent.save()
    res.send(result)
    
})

router.delete('/:id',async(req,res)=> {
    const parent= await Parent.findByIdAndRemove(req.params.id)
    if(!parent) return
    res.send(parent)


})


module.exports = router;