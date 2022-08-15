const { User, UserResults } = require("../models/models")
const bcrypt = require('bcrypt') 
const ApiError = require("../error/ApiError")
const jwt = require('jsonwebtoken')

const generateJwt = (id,email,role, firstName, lastName, birthYear, profilePicture) => {
	return jwt.sign(
		{id: id , email, role, firstName, lastName, birthYear, profilePicture},
		process.env.SECRET_KEY,
		{expiresIn : '24h'}
		)
}

class UserController {
	async registration (req,res, next) {
		let {email, password, role, firstName, lastName, birthYear} = req.body
		if (!email || !password || !firstName || !lastName || !birthYear) {
			return next (ApiError.badRequest('введите все поля'))
		}
		let candidate = await User.findOne({where : {email}})
		if (candidate) {
			return next (ApiError.badRequest('пользователь с таким email уже существует'))
		}
		const hashPassword = await bcrypt.hash(password, 10) 
		const newUser = await User.create({email,password : hashPassword, role, firstName, lastName, birthYear})
		
		const token = generateJwt(newUser.id, newUser.email, newUser.role, newUser.firstName, newUser.lastName, newUser.birthYear, newUser.profilePicture)
		return res.json({token})
	}
	async login(req, res, next) {
		const {email,password} = req.body
		const user = await User.findOne({where: {email}})
		if (!user) {
			return next (ApiError.badRequest('Неправильный логин или пароль'))
		}

		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next (ApiError.badRequest('Неправильный логин или пароль'))
		}

		const token = generateJwt(user.id, user.email, user.role, user.firstName, user.lastName, user.birthYear, user.profilePicture)
		return res.json({token})
	}
	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.firstName, req.user.lastName, req.user.birthYear, req.user.profilePicture)
		return res.json({token})
	}
	
	async getAll(req, res) {
		return res.json(await User.findAll())
	}

	async getExact(req, res, next) {
		const {id} = req.params
		
		if (!Number(id)) {
			return next (ApiError.badRequest(`не могу найти пользователя с id:${id}`))
		}
		const user = await User.findOne({
			where : {id},
			include : [{model: UserResults, as:'user_results'}]
		})
		return res.json(user)
	}
}
module.exports = new UserController()