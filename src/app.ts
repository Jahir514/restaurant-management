import express from 'express'
import { databaseConnection } from './config/databaseConnection'
import { errorHandler } from './middlewares/errorHandler.middleware'
import routes from './routes'
const app = express()

//parsing data from body of request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//main application route
app.use('/api/v1', routes)

//error handle middleware
app.use(errorHandler)

//database connection
databaseConnection()
app.listen(8080, () => console.log('app is running on port 8080'))
