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

const student= require('./routes/studentApi')
const teacher= require('./routes/teacherApi')
const parent= require('./routes/parentApi')
const school= require('./routes/schoolApi')
const branch= require('./routes/branchApi')
const course= require('./routes/courseApi')
const grade= require('./routes/gradeApi')
const admin= require('./routes/adminApi')
const express=require('express')
const mongoose= require('mongoose');
const app = express()

mongoose.connect('mongodb://localhost/school')
.then(()=>{console.log("connected to mongo")})
.catch((err)=>{console.log('connection to database failed',err)})


app.use('/api/school/branch/student/',student)
app.use('/api/school/branch/teacher/',teacher)
app.use('/api/school/branch/parent/',parent)
app.use('/api/school/branch/',branch)
app.use('/api/school/branch/school/',school)
app.use('/api/school/branch/admin/',admin)
app.use('/api/school/branch/course/',course)
app.use('/api/school/branch/grade/',grade)



const port=process.env.PORT||3000

app.listen(port)