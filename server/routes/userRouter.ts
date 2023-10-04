const Router = require('express')
export const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../authMiddleware')

router.post('/reg',userController.registration)
router.post('/log',userController.login)
router.get('/auth',authMiddleware,userController.check)

module.exports = router
export{}