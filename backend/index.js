const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
 
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//Routes

app.use('/api/folder',require('./routes/folder'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/file',require('./routes/file'));

app.listen(port, () => {
  console.log(`FILES listening on port ${port}`)
})