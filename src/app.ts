import express from 'express'
import { databaseConnection } from './config/databaseConnection'
import { errorHandler } from './middlewares/errorHandler.middleware'
const app = express()

//parsing data from body of request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//error handle middleware
app.use(errorHandler)
//database connection
databaseConnection()
app.listen(8080, () => console.log('app is running on port 8080'))
