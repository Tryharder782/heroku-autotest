const ApiError = require("../error/ApiError")
const { UserResults } = require("../models/models")

class userResultsController {
	async create (req, res, next) {
		const {testId, rightAnswers, wrongAnswers, performance, userResultId} = req.body
		if (!testId || rightAnswers===null || wrongAnswers===null){
			return next(ApiError.badRequest('Заполните все поля!'))
		}
		const result = await UserResults.create({testId : testId, rightAnswers: rightAnswers, wrongAnswers, performance, userResultId})
		return res.json(result)
	}
	async update(req, res, next) {
		const {testId, rightAnswers, wrongAnswers, performance, userResultId} = req.body
		if (!testId || !userResultId){
			return next(ApiError.badRequest('Заполните все поля!'))
		}
		const result = await UserResults.update({rightAnswers, wrongAnswers, performance, userResultId}, {where:{testId}}, {multi: true})
		return res.json(result==1? 'lessgooo': 'wtf, 0?')
	}
	async getAll(req, res) {
		return res.json(await UserResults.findAll())
	}
	async getExact(req, res, next) {
		const {id} = req.params
		if (!Number(id)) {
			return next(ApiError.badRequest(`не могу найти результат теста с id:${id}`))
		}
		const userResult = await UserResults.findOne({where : {id},})
		return res.json(userResult)
	}
}
module.exports = new userResultsController()
