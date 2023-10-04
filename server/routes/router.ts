const Router = require('express')
export const router = new Router()
const userRouter = require('./userRouter')

router.use('/user',userRouter)

module.exports = router
export{}