const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'src')))

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'src', 'index.js'))
})

app.listen(PORT, () => {
	console.log(`server started at PORT: ${PORT}`);
})