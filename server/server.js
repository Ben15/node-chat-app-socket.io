const path = require('path')

const express = require('express')
const app = express()

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;




app.use(express.static('public'))












app.listen(port, () => console.log(`App is running on port ${port}!!`))
