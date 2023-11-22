import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { onSnapshot, query, collection, where, orderBy } from "firebase/firestore";
import { ChatContext } from "../chatContext";


const Chats = () => {

    const [chats, setChats] = useState([])
    const userdata = useSelector((state) => state.userdata);
    const { dispatch } = useContext(ChatContext);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const chatQuery = query(
                collection(db, "Chat"),
                where("usersID", "array-contains", userdata.userId),
                orderBy("updateTime","asc")
            );

            const unsub = onSnapshot(chatQuery, (snapshot) => {
                const chatData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    chatId: doc.id, // Thêm mã document vào mỗi đối tượng dữ liệu
                  }));
                setChats(chatData);
                sort(chatData);
            });

            return () => {
                unsub();
            };
        }
        getChats();

    }, [userdata.userId]);
    const sort = (u)=>{
        u.forEach(e => {
            if(e.usersID[0]!== userdata.userId){
                const tg = e.usersID[0];
                e.usersID[0] = e.usersID[1];
                e.usersID[1] = tg;
            }
        });
    }
    
    const handleSelected = (chatId) => {
        dispatch({ type: "CHANGE_USER", payload: chatId });
    }
    console.log(chats)
    return (
        <div className="chats">
        {chats.map((chat) => (
          <div key={chat.chatId} style={{ marginTop: "3px", background: 'rgba(0,0,0,0.15)', borderRadius: '5px', padding: '5px 10px' }}>
            <div className="userChatInfo" onClick={() => handleSelected(chat)} style={{height:"30px",paddingLeft:"20px"}}>
              <span>{chat.usersID[1]}</span>
              <p style={{ color: "gray", margin: "0", fontSize: "0.8rem" }}>{chat.lastMess}</p>
            </div>
          </div>
        ))}
      </div>
    )
}

export default Chats;