const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const taskRouter=require('./routes/tasks.routes')

//Settings
//cosas como app.set("port", process.env.PORT || 4000);

const app=express()
//Middlewares 
app.use(morgan('dev'))
app.use(cors())
app.use(express.json());

//Routes
app.use(taskRouter)

// handling errors
app.use((err, req, res, next)=>{
    return res.json({
        message: err.message
    })
});



app.listen(4000)
console.log("server on port 4000")




