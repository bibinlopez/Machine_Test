require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')

//connectDB
const connectDB = require('./db/connect')

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')

//middlewares
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.use('/auth', authRoute)
app.use('/user', userRoute)

// home route
app.get('/', (req, res) => {
  res.send('Food_Menu_App_api')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

// The server starts only after database connected.
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server listening on port: ${port}`))
  } catch (err) {
    console.log(err)
  }
}

// invoking the 'start' function.
start()
