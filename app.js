//school- Admin
    //branch
        //Admin
        //grade and section
            //student
                //parents
                //course
                    //grade
            //teacher
                //course
                //student
    
//Persons
    //Admins     
       //track payments
    //Teachers
      //fill grade
      //contact parent

    //Students
      //see their grade
    //Parents
      //see student grade
      //contact teacher
      //pay
const cors=require('cors')
const student= require('./routes/studentApi')
const teacher= require('./routes/teacherApi')
const parent= require('./routes/parentApi')
const school= require('./routes/schoolApi')
const branch= require('./routes/branchApi')
const course= require('./routes/courseApi')
const grade= require('./routes/gradeApi')
const admin = require('./routes/adminApi')
const register=require('./routes/register')
const express=require('express')
const mongoose= require('mongoose');
const app = express()

mongoose.connect('mongodb://localhost/school')
.then(()=>{console.log("connected to mongo")})
.catch((err)=>{console.log('connection to database failed',err)})

app.use(cors())
app.use('/api/student/',student)
app.use('/api/teacher/',teacher)
app.use('/api/parent/',parent)
app.use('/api/school/branch/',branch)
app.use('/api/school/',school)
app.use('/api/branch/admin/',admin)
app.use('/api/course/',course)
app.use('/api/grade/', grade)
app.use('/api/register/',register)



const port=process.env.PORT||3000

app.listen(port)