import axios from "axios";
export const serverURL = 'http://localhost:5000/api'

const $server = axios.create({
    baseURL:serverURL
})
const $authServer = axios.create({
    baseURL:serverURL
})
const authInterceptor = (config:any) =>{
    config.headers.authorization = `${localStorage.getItem('token')}`
    return config
}
$authServer.interceptors.request.use(authInterceptor)

export {
    $server,
    $authServer
}