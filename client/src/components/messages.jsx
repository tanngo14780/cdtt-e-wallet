import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../chatContext";
import { db } from "../firebase-config";
import { collection,where, orderBy,query, onSnapshot } from "firebase/firestore"
import { useSelector } from "react-redux";

const Messages = () => {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)
    const userdata = useSelector((state) => state.userdata);

    const compare =(a,b)=>{
        if(a==b){
            console.log(a)
            return true;
        }else{
            console.log(a)
            return false;
        }
        
    }

    useEffect(() => {
        const getMessages = () => {
            const chatQuery = query(
                collection(db, "Message"),
                where("chatId","==",data.chatId),
                orderBy("createdAt", "asc")
            );

            const unsub = onSnapshot(chatQuery, (snapshot) => {
                const chatData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setMessages(chatData);
            });

            return () => {
                unsub();
            };
        }
        getMessages();
    }, [data.chatId])
    console.log(messages)
    return (
        <div className="abc">
            {messages.map((m) => (
                    <div key={m.id} style={{marginTop:"2px"}}>
                        {(m.sender ==userdata.userId) ? (
                            <div style={{display:"flex", justifyContent:"flex-end"}} >
                                <span style={{backgroundColor:"rgba(10, 109, 200,0.9)", color:"white", padding:"6px",borderRadius:"10px"}}>
                                    {m.content}
                                </span>
                            </div>) : (
                            <div style={{display:"flex", justifyContent:"flex-start"}} >
                                <span style={{backgroundColor:"rgba(10, 109, 200,0.9)", color:"white", padding:"6px",borderRadius:"10px"}}>
                                    {m.content}
                                </span>
                            </div>)
                        }
                    </div>              
            ))}
        </div>
    )
}

export default Messages;