const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db')
const postRouter = require('./routes/post-router')
const userRouter = require('./routes/user-router')

const app = express()
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Oops!');
})

// app.get('/mp', function(request, response) {
//     console.log('About page visited!');
//     const filePath = path.resolve(__dirname, './build', 'index.html')
//     fs.readFile(filePath, 'utf8', function (err,data) {
//       if (err) {
//         return console.log(err);
//       }
//       data = data.replace(/\$OG_TITLE/g, 'About Page');
//       data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
//       result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//       response.send(result);
//     });
//   });

app.use('/api', postRouter)
app.use('/api-user', userRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
