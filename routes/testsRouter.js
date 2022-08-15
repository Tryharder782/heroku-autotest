const Router = require ('express')
const TestController = require('../controllers/testController')
const checkRole = require('../middlewares/checkRoleMiddleware')
const router = new Router()


router.post('/', checkRole('ADMIN'), TestController.create)
router.get('/', TestController.getAll)
router.get('/:id', TestController.getExact)





module.exports = router