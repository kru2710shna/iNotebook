const connectToMongo = require('./db');

connectToMongo();
const express = require('express')
const app = express()
const port = 3000


// Routes
app.use('/api/auth' , require('./Routes/auth'))
app.use('/api/notes' , require('./Routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




