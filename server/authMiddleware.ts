const jwt = require('jsonwebtoken')
const ApiError = require('./error/ApiError')

module.exports = function (req:any,res:any,next:any){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[0]//Bearer
        if (token === null){
            return ApiError.forbidden('Не авторизован!')
        }
        const decoded = jwt.verify(token,'jsDHJLl3234KH2347@#!$1asdbkj5')
        req.user = decoded
        next()
    }catch (e){
        return ApiError.forbidden('Не авторизован!')
    }
}
export{}