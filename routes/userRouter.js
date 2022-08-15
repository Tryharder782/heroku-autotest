const Router = require ('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleWare = require('../middlewares/authMiddeware')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleWare, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getExact)


module.exports = router