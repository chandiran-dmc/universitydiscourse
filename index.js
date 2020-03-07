const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db')
const postRouter = require('./routes/post-router')
const userRouter = require('./routes/user-router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Oops!');
})

app.use('/api', postRouter)
app.use('/api-user', userRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});
