
const Router = require ('express')
const choicesController = require('../controllers/choicesController')
const userResultsController = require('../controllers/userResultsController')
const router = new Router()

router.post('/', userResultsController.create)
router.put('/', userResultsController.update)
router.get('/', userResultsController.getAll)
router.get('/:id', userResultsController.getExact)

module.exports = router