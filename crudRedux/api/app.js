const express= require('express');
const ConnectDB = require('./connection/connect');
const cors = require('cors');
const app  = express()
const port = 3000
ConnectDB()
app.use(cors())
app.use(express.json())
app.use('/post', require('./route/postRoute'))

app.listen(port , console.log(`app is listening on port ${port}`))