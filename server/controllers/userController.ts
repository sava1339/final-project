const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const generateJwt = (id:number,login:string) =>{
    return jwt.sign(
        {id,login},
        'jsDHJLl3234KH2347@#!$1asdbkj5',
        {expiresIn:'24h'}
    )
}
class UserController {
    async registration(req:any,res:any,next:any){
        const {login,password} = req.body
        if(!password){
            return next(ApiError.badRequest('Некортеный пароль!'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({login,password:hashPassword})
        const token = generateJwt(user.id,user.login)
        return res.json({token})
    }
    async login(req:any,res:any,next:any){
        const {login,password} = req.body
        const user = await User.findOne({where:{login}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('Неверный пароль!'))
        }
        const token = generateJwt(user.id,user.login)
        return res.json({token})
    }
    async check(req:any,res:any,next:any){
        if(!req.user){
            return next(ApiError.badRequest('Токена нет!'))
        }
        const token = generateJwt(req.user.id,req.user.login)
        return res.json({token})
    }
}
module.exports = new UserController()
export{}