import {ChangeEvent, useEffect, useState} from 'react'
import './App.css'
import {check, checkUser, log, reg, User} from "./requests/userRequests";
import Chat from './components/chat'

function App() {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user,setUser] = useState("")
    const [loading,setLoading] = useState(true)
    const registration = async ()=>{
        try {
            await reg(login,password).then(data=> data? alert('Успешная регестрация') : alert('Ошибка'))
        }catch (e) {
            alert('Ошибка')
        }

    }
    const loginFunc = async ()=>{
        try {
            await log(login,password).then(data=> data? alert('Успешный вход') : alert('Ошибка'))
            window.location.reload()
        }catch (e) {
            alert('Ошибка')
        }
    }
    const exitUser = ()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }
    useEffect(()=>{
       ( async()=>{
           await check().then(data=>{
               if(data !== undefined && data !== false){
                   checkUser().then(data=> setUser(data))
               }
           }).finally(()=>setLoading(false))
        })()
    },[])
  return (
    <>
        {loading ?
            <div>
                <p>ЗАГРУЗКА</p>
            </div>
            :
            <div className="auth-block">
                <div className="left-box">
                    <p>Вы {user ==="" ? "не вошли" : user}</p>
                    {user === "" && <input className="input" placeholder="Логин" value={login}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
                            type="text"/>}
                    {user === "" && <input className="input" placeholder="Пароль" value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            type="password"/>}
                    {user === "" && <button className="button" onClick={registration}>Зарегестрироватся</button>}
                    {user === "" && <button className="button" onClick={loginFunc}>Войти</button>}
                    <button className="button" onClick={exitUser}>Выход</button>
                </div>
                <div className="right-box">
                    <Chat username={user} />
                </div>
            </div>
        }
    </>
  )
}

export default App
