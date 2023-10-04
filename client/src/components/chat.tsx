import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {io} from "socket.io-client";
interface messageData {
    id:string,
    msg: {
        username:string,
        text:string
    }
}
const Chat = (username:string) => {
    const [messages, setMessages] = useState<messageData[]>([]);
    const [connected, setConnected] = useState(false);
    const [value,setValue] = useState("")
    const socket = io('http://localhost:5000')
    useEffect(()=>{
        setConnected(true)
        const chatMessage = (data:string)=>{
            setMessages(prevState => [...prevState, {
                id: JSON.parse(data).id,
                msg: {
                    username:JSON.parse(data).username,
                    text: JSON.parse(data).msg
                }
            }])
        }
        socket.on('chat message', chatMessage)

        return ()=>{
            socket.off('chat message', chatMessage)
        }
    },[])

    const sendMessage = async () => {
        if(username.username){
            socket.emit('chat message', JSON.stringify({id: Date.now() ,username:username.username,msg:value}) )
            setValue('')
        }
    }

    return (
        <div>
            {connected?
                <div>
                    <div className="dialog-window">
                        {messages.map((el:messageData)=><div key={el.id}>
                            {el.msg.username === username.username ?
                                <p className="my-message">{el.msg.username + ": " + el.msg.text}</p>
                                :
                                <p className="other-message">{el.msg.username + ": " + el.msg.text}</p>
                            }
                        </div>)}
                    </div>
                    <div className="write-message">
                        <input value={value} onChange={(event:ChangeEvent<HTMLInputElement>)=>setValue(event.target.value)} type="text"/>
                        <button onClick={sendMessage}>Отправить</button>
                    </div>

                </div>
                :
            <p>load</p>
            }
        </div>
    );
};

export default Chat;