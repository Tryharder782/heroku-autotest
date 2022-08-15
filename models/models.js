const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define( 'user', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type:DataTypes.STRING,allowNull: false, unique: true},
	password: {type : DataTypes.STRING},
	role: {type:DataTypes.STRING,defaultValue: 'USER'},
	firstName: {type:DataTypes.STRING, allowNull: false},
	lastName: {type:DataTypes.STRING,allowNull: false},
	birthYear: {type:DataTypes.INTEGER,allowNull: false},
	performance: {type:DataTypes.INTEGER, defaultValue: 0},
	rank:{type:DataTypes.INTEGER},
	profilePicture:{type:DataTypes.STRING, defaultValue: 'nopfp.jpg'},
})


const UserResults = sequelize.define( 'user_results', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	testId: {type:DataTypes.INTEGER, allowNull: false},
	rightAnswers: {type:DataTypes.INTEGER, allowNull: false},
	wrongAnswers: {type:DataTypes.INTEGER, allowNull: false},
	performance: {type:DataTypes.INTEGER, defaultValue: 0}
})
const Test = sequelize.define( 'test', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type:DataTypes.STRING, allowNull: false},
	description: {type:DataTypes.STRING}
})


const Question = sequelize.define( 'question', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	correctAns : {type:DataTypes.INTEGER, allowNull:false},
	number : {type:DataTypes.INTEGER},
	title: {type:DataTypes.STRING, allowNull: false},
	description: {type:DataTypes.STRING, allowNull: false, defaultValue: ' '},
	picture: {type:DataTypes.STRING, defaultValue: "questionMock.png"},
})

const Choice = sequelize.define('choice', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	number : {type:DataTypes.INTEGER},
	text: {type:DataTypes.STRING},
})


User.hasOne(UserResults, {as : 'user_results'})
UserResults.belongsTo(User)

Test.hasMany(Question, {as : 'questions'})
Question.belongsTo(Test)

Question.hasMany(Choice, {as : 'choices'})
Choice.belongsTo(Question)

module.exports ={
	User,
	Test,
	Choice,
	Question,
	UserResults
}