const { Question, Choice } = require("../models/models")
const path = require('path')
const uuid = require('uuid')
const ApiError = require("../error/ApiError")
class QuestionController {
	async create(req, res, next) {
		try {
			let { title, description, choices, testId, number, correctAns} = req.body
			if (!choices || !title || !description || !testId || !number || !correctAns) {
				return next(ApiError.badRequest('заполните все бланки!'))
			}
			const { picture } = req.files
			let fileName = uuid.v4() + '.jpg'
			picture.mv(path.resolve(__dirname, '..', 'static', fileName))

			const newQuestion = await Question.create({ title, description, picture : fileName, testId, number, correctAns })

			if(choices) {
				choices = JSON.parse(choices)
				let counter = 1 
				choices.forEach(i => {
					Choice.create({
						text: i.text,
						number: counter,
						questionId: newQuestion.id
					})
					counter +=1
				})
			}

			return res.json(newQuestion)
		}
		catch (e) {
			return next (ApiError.badRequest(e.message))
		}
	}

	async update(req, res, next) {
		let question = req.body
		if (!question.number) {
			return next (ApiError.badRequest('Введите Number вопроса'))
		}
		const { picture } = req.files
		if (picture){
			let fileName = uuid.v4() + '.jpg'
			picture.mv(path.resolve(__dirname, '..', 'static', fileName))
			question = {...question, picture : fileName}
		}
		const updatedQuestion = await Question.update(question, {where: {number : question.number, testId : question.testId}})
		res.json(updatedQuestion)
	}
	async getAll(req, res) {
		return res.json(await Question.findAll())
	}
	async getByTest(req, res, next) {
		const { qId, tId } = req.params
		const question = await Question.findOne({
			where: { testId : tId, number: qId},
			include : [{model: Choice, as : 'choices'}]

		})
		return res.json(question)
	}
	async getExact(req, res, next) {
		const { id } = req.params
		console.log(id);
		
		if (!Number(id)) {
			return next (ApiError.badRequest(`не могу найти вопрос с id:${id}`))
		}
		const question = await Question.findOne({
			where: { id },
			include : [{model: Choice, as : 'choices'}]

		})
		return res.json(question)
	}
}
module.exports = new QuestionController()