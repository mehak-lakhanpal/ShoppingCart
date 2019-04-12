const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', express.static(path.join(__dirname,'public')))
app.use('/api',require('./routes/api').route)

const PORT = process.env.PORT || 5878
app.listen(PORT)
//app.listen(3456,()=>console.log(`Server started at http://localhost:3567`))