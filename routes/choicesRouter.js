
const Router = require ('express')
const choicesController = require('../controllers/choicesController')
const checkRole = require('../middlewares/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole('ADMIN'), choicesController.create)
router.get('/', choicesController.getAll)
router.get('/:id', choicesController.getExact)

module.exports = router