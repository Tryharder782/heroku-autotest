require('dotenv').config();
const { Sequelize } = require('sequelize')



const proConfig = process.env.DATABASE_URL //heroku addons



if (process.env.NODE_ENV === 'production'){
	module.exports = new Sequelize({
	connectionString: proConfig
})}
else { 
	module.exports = new Sequelize (
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			dialect : 'postgres',
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			// dialectOptions: {
			// 	ssl: {
			// 		require : false,
			// 		rejectUnauthorized : false
			// 	}
			// }
		},
		
	)
}
