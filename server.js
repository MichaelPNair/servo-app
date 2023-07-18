require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const servosRouter = require('./routes/servos')

app.use(express.static('client'))
app.use(express.json())
app.use("/api", servosRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})