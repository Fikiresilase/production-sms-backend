const express = require('express')
const {Student} =require('../models/student')
const studentSchema = require('../models/student')
const { Teacher } = require('../models/teacher')
const { Parent } = require('../models/parent')

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

// router.get('/grade/:id',async(req,res)=> {
//     const students=await Student.find({grade:req.params.id}).sort({name:1})
   
//     res.send(students)

// })

router.get('/grade/:grade/:section',async(req,res)=> {
    const students=await Student.find({grade:req.params.grade,section:req.params.section}).sort({name:1})
    if(!students) return  
    res.send(students)
    
})    

router.get('/teacher/:teacherId', async (req, res) => {
    const teacher = await Teacher.findById(req.params.teacherId)
    const teacherGrade = teacher.grade.map(g => g.name)
         const grade = req.query.grade
         const section = req.query.section
         const course = req.query.course
    if (!(req.query.grade) && !(req.query.section) && !(req.query.course)) {
    
        if (!teacher) return
        const students = await Student.find({ 'grade.name': { $in: teacherGrade }})
        if (!students) return
        res.send(students)
    }
    

    else if ((req.query.grade) && (req.query.section) && (req.query.course)) {
        const students = await Student.find({ 'grade.name': grade, section: section, course:{$elemMatch:{name:course}}})
        if (!students) return
        else res.send(students)

    }

    else {
        if (grade && section) {
            const students = await Student
                .find({ 'grade.name': grade ,  section: section })
            if (!students) return
            else res.send(students)
        }
        else if (grade && course) {
            const students = await Student
                .find({ 'grade.name': grade , course: { $elemMatch: { name: course } } })
            if (!students) return
            else res.send(students)
            
        }
        else if (section && course) {
            const students = await Student
                .find( { section: section , course: { $elemMatch: { name: course } } })
            if (!students) return
            else res.send(students)
        }
        else {
            const students = await Student
                .find().or([{ 'grade.name': grade }, { section: section }, { course: { $elemMatch: { name: course } } }])
            if (!students) return
            else res.send(students)
        }
       

    }
}
     
)

router.get('/parent/:id', async (req, res) => {
    const parent = await Parent.findById(req.params.id)
    res.send(parent)
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

// router.put('/:id',async(req,res)=> {
//     const student=await student.findById({_id:req.params.id}).sort({name:1})
//     if(!student) return
//     if(req.body.name) {
//         student.name=req.body.name
//     }
//     if(req.body.email) {
//         student.email=req.body.email
//     }
//     if(req.body.grade) {
//         student.grade=req.body.grade
//     }
//     if(req.body.section) {
//         student.section=req.body.section
//     }
//     if(req.body.parent) {
//         student.parent=req.body.parent
//     }
//     if(req.body.password) {
//         student.password=req.body.password
//     }
//     let result = student.save()
//     res.send(result)
    
// })

router.put('/:studentId/course/:courseName', async (req, res) => {
   if (parseFloat(req.body.grade )> 100 || parseFloat(req.body.grade ) < 100) res.send(null) 
    const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId,'course.name':req.params.courseName },
        { $set: {'course.$.grade':parseInt(req.body.grade)}})
     
})

router.delete('/:id',async(req,res)=> {
    const student= await Student.findByIdAndRemove(req.params.body)
    if(!student) return
    res.send(student)

})

module.exports= router