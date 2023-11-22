import React,{useContext, useState} from "react";
import { useSelector } from "react-redux";
import { ChatContext } from "../chatContext";
import { db } from "../firebase-config";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";


export default function Input(){
    
    const userdata = useSelector((state) => state.userdata);
    const {data} = useContext(ChatContext)
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = async () => {
        try {
          const newMessageData = {
            chatId: data.chatId,
            content: newMessage,
            createdAt: serverTimestamp(),
            sender: userdata.userId,
          };
      
          await addDoc(collection(db, "Message"), newMessageData);

          const updateNewmess = doc(db, "Chat", data.chatId);
          await updateDoc(updateNewmess, { 
            lastMess: newMessage ,
            updateTime: serverTimestamp()
          });
      
          setNewMessage("");
        } catch (err) {
          console.error(err);
        }
      };
    return(
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input
                    type="text"
                    name=""
                    id=""
                    value={newMessage}
                    style={{fontSize:"1.2em", width: '91%', height: '35px' }}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit} style={{width:"50px"}}>
                    Gửi
                </button>
        </div>
    )
}