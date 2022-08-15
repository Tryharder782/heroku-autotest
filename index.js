require('dotenv').config()
const sequelize = require('./db')
const cors = require('cors')
const express = require('express')
const router = require('./routes/index')
const path = require('path')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middlewares/filePathMiddleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use (express.static(path.join(__dirname, 'client/build')))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
	
})
if (process.env.NODE_ENV === 'production') {
	//server static content
}


//error handler, last middleware

app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(5000, () => console.log(`Server started at PORT:${5000}`))
	} catch(e) {
		console.log(e);
	}
}

start()