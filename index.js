import express from 'express'
import ConnectToDB from './db/dbconnection.js'
import v1Router from './src/Routers/v1.routes.js'
import userRouter from './src/modules/users/routers/user.router.js'
import CompanyRouter from './src/modules/Company/routers/company.router.js'
import jobRouter from './src/modules/job/routers/job.router.js'
import ApplicationRouter from './src/modules/application/routers/application.router.js'

import  dotenv  from 'dotenv'



dotenv.config()
const app = express()
const port = 3000



app.use(express.json())
app.use(express.static('uploads'))
app.use('/users',userRouter)
app.use('/jobs',jobRouter)
app.use('/companies',CompanyRouter)

app.use('/applications/:companyId/:date',ApplicationRouter)



app.use('/api/v1',v1Router)
app.get('/', (req, res) => res.send('Hello World!'))







app.use((error,req,res,next)=>{
    const {message,status}=error
    res.status(status ||500).json({message})
})




ConnectToDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
