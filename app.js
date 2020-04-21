const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()

dotenv.config()

app.use(session({
    name: 'session-express',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 1000 * 60 * 60 * 24 * 31 }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 31
    }
}));

app.use(fileUpload())
app.use(cookieParser())
app.use(express.json())
app.use('/auth', require('./routes/auth.routes'))
app.use('/api', require('./routes/post.routes'))
app.use('/api', require('./routes/comment.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile('index.html')
    })
}

app.post('/upload', async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file

    file.mv(path.join(__dirname, 'client', 'public', 'uploads', file.name), err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

const PORT = process.env.PORT || 5000

async function start () {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`)
    })
}

start()