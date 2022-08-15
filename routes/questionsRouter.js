const questionController = require('../controllers/questionController')
const Router = require ('express')
const checkRole = require('../middlewares/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole('ADMIN'), questionController.create)
router.get('/', questionController.getAll)
router.put('/',questionController.update)
router.get('/byTest/:tId/:qId', questionController.getByTest)
router.get('/exact/:id', questionController.getExact)

module.exports = router