const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db')
const postRouter = require('./routes/post-router')
const userRouter = require('./routes/user-router')
const commentRouter = require('./routes/comment-router')

const app = express()
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Oops!');
})

app.use('/api', postRouter)
app.use('/api-user', userRouter);
app.use('/api-comment', commentRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
