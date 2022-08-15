const ApiError = require("../error/ApiError")
const {  Test, Question } = require("../models/models")

class TestController {
	async create (req, res, next) {
		try {let {title, description, questions} = req.body

		const result = await Test.create({title, description})
		
		if(questions) {
			questions = JSON.parse(questions)
			let counter = 1
			questions.forEach(i => {
				Question.create({
					number : counter,
					title: i.title,
					description: i.description,
					testId: result.id,
					correctAns: i.correctAns
				})
				counter+=1
			})
		}
		return res.json(result)
	}	catch (e) {
		return next(ApiError.badRequest(e.message))
	}
	}
	async getAll(req, res) {
		return res.json(await Test.findAll())
	}
	async getExact(req, res, next) {
		const {id} = req.params
		if (!Number(id)) {
			return next(ApiError.badRequest(`не могу найти тест с id:${id}`))
		}
		const test = await Test.findOne({
			where : {id},
			include : [{model: Question, as: 'questions'}]
		})
		return res.json(test)
	}
}
module.exports = new TestController()
