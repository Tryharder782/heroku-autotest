const { Question, Choice } = require("../models/models")
const path = require('path')
const uuid = require('uuid')
const ApiError = require("../error/ApiError")
class QuestionController {
	async create(req, res, next) {
		try {
			let {text, number, questionId} = req.body
			if (number===null || questionId===null) {
				return next(ApiError.badRequest('заполните все бланки!'))
			}
			const newChoice = await Choice.create({text, number, questionId})
			return res.json(newChoice)
		}
		catch (e) {
			return next (ApiError.badRequest(e.message))
		}
	}


	async getAll(req, res) {
		return res.json(await Choice.findAll())
	}
	async getExact(req, res, next) {
		const { id } = req.params
		
		if (!Number(id)) {
			return next (ApiError.badRequest(`не могу найти вопрос с id:${id}`))
		}
		const choice = await Question.findOne({where: { id }})
		return res.json(choice)
	}
}
module.exports = new QuestionController()