const express = require('express')
const {Grade} =require('../models/grade')
const {gradeSchema} = require('../models/grade')
const router  = express.Router()



router.use(express.json())
router.get('/',async(req,res)=> {
        const grade=await Grade.find().sort()
        const count= await Grade.countDocuments()
        res.send(grade)
        
})
router.get('/:id',async(req,res)=> {
    const grade=await Grade.findById(req.params.id)
    if(!grade) return
    res.send(grade)
    
})





router.post('/',async(req,res)=> {
    const grade=await new Grade({
        name:req.body.name,
    })
    const addedgrade= await grade.save()
    res.send(addedgrade)
    
})

router.put('/:id',async(req,res)=> {
    const grade=await Grade.findById({_id:req.params.id}).sort({name:1})
    if(!grade) return
    if(req.body.name) {
        grade.name=req.body.name
    }
   
   
    let result = grade.save()
    res.send(result)
    
})

router.delete('/:id', async (req, res, next) => {
    try {
        const grade = await Grade.findByIdAndRemove(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.json({ message: 'Grade deleted successfully', grade });
    } catch (err) {
        next(err); 
    }
});


module.exports = router;