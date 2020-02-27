const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const postRouter = require('./routes/post-router')
const axios = require('axios');

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', postRouter)

app.listen(apiPort, () => {
    console.log(`Server running on port ${apiPort}`)

    axios({
        method: 'post',
        url: 'http://localhost:3000/api/post',
        data: {
            // Pid should be a unique value by hashing the time + username
            pid: 400,
            title: "tae yoon fuck you",
            user: "tae",
            type: "text",
            tag: ["cs240", "cs252"],
            count: 100,
            comments: [],
            content: "fuck you",
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
})