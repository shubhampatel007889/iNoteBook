const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})