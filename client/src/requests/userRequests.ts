
import jwt from 'jwt-decode'
import {$authServer, $server} from "../http";
const localToken = localStorage.getItem('token')

export interface User {
    id:number,
    login:string
}

export const reg = async (login:string,password:string)=>{
    try {
        const {data} = await $server.post('/user/reg',{login,password})
        localStorage.setItem('token',data.token)
        return true
    }catch (e) {
        return false
    }
}
export const log = async (login:string,password:string)=>{
    const {data} = await $server.post('/user/log',{login,password})
    localStorage.setItem('token',data.token)
    return jwt(data.token)
}
export const check = async()=>{
    if(!localToken){
        return false
    }
    const {data} = await $authServer.get('/user/auth')
    localStorage.setItem('token',data.token)
    return jwt(data.token)
}
export const checkUser = async()=>{
    const unDecode = jwt<User>(String(localToken))
    return unDecode.login
}