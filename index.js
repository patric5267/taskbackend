const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
require('./connection/db')
app.use(cors())
app.use(express.json())

app.use(require('./routes/user'))
app.use(require('./routes/note'))

app.get('/' , ()=>{
    console.log('Server successfully started');
})

app.listen(port , ()=>{
    console.log(`Server started at ${port}`);
})