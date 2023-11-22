import React, { useContext, useEffect, useState } from "react";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../chatContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Chatbox() {
  const { data } = useContext(ChatContext);
  const [user, setUser] = useState("");

  const getUser = async (userId) => {
    const q = query(collection(db, "Users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const documentData = querySnapshot.docs[0].data();
      const username = documentData.username;
      setUser(username);
    } 
  };

  useEffect(() => {
    getUser(data.user);
  }, [data.user]);

  return (
    <div className="boxchat" style={{ position: 'relative', background: 'white', border: '1px black solid', height: '400px', width: '500px' }}>
      <div className="header" style={{ paddingTop: "15px", paddingLeft: "20px" }}>
        <span>{user}</span>
      </div>
      <div className="chat-feed" style={{ overflowY: 'auto', border: "1px solid black", height: '300px', padding: '10px', width: '96%', position: 'absolute', bottom: "30px" }}>
        <Messages />
        <div ref={(el) => { el && (el.scrollTop = el.scrollHeight); }}></div>
      </div>
      <div style={{ width: '100%', position: 'absolute', bottom: "0px" }}>
        <Input />
      </div>
    </div>
  )
}
