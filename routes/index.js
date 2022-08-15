const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const userResultsRouter = require('./userResultsRouter')
const testsRouter = require('./testsRouter')
const questionsRouter = require('./questionsRouter')
const choicesRouter = require('./choicesRouter')

router.use('/users', userRouter)
router.use('/tests', testsRouter)
router.use('/choices', choicesRouter)
router.use('/questions', questionsRouter)
router.use('/userResults', userResultsRouter)

module.exports = router