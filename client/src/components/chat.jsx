
import { useState, useEffect } from 'react';
import Search from "../components/search";
import Chats from './chats';
import Chatbox from '../components/chatbox'
import { useSelector } from 'react-redux';
import { db } from "../firebase-config";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [room, setRoom] = useState("");

    const userdata = useSelector((state) => state.userdata);

    
    useEffect(() => {

        const queryMessages = query(
            messagesRef,
            where("chatId", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messagesres = [];
            snapshot.forEach((doc) => {
                messagesres.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messagesres);
        });
        return () => unsuscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;
        await addDoc(messagesRef, {
            message: newMessage,
            createdAt: serverTimestamp(),
            user: userdata.username,
            userId: userdata.objectId,
            chatId: room,
        });
        console.log(newMessage)
        setNewMessage("");

    };

    return (
        <div>
            <div className="chat-body" style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="chat-list" style={{ background: 'white', padding: '10px 20px', border: '1px black solid' }}>
                    <div className="chat-header" style={{ marginBottom: '10px' }}>
                        <Search/>
                    </div>
                    <div style={{ fontSize: '1.2em', fontWeight: '700', paddingBottom: '10px' }}>Cuộc trò chuyện của tôi</div>
                    <div style={{overflowY:'auto', height:"75%"}}>
                       <Chats/>
                    </div>
                </div>
                <div className="boxchat" style={{ position: 'relative', background: 'white', border: '1px black solid', height: '400px', width: '500px' }}>
                    {/* <div className="header" style={{ paddingLeft: "20px" }}>
                        <h2>bao van</h2>
                    </div>
                    <div className="chat-feed" style={{ overflowY: 'auto', border: "1px solid black", height: '300px', padding: '10px', width: '96%', position: 'absolute', bottom: "30px" }}>
                        {messages.map((message) => (
                            <div key={message.id} className="message" style={{ color: "white", padding: '3px', width: "98%" }}>
                                <span className="user" style={{ borderRadius: "5px", padding: "5px", backgroundColor: "rgb(10, 109, 200)", width: "auto" }}>
                                    {message.message}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ width: '100%', position: 'absolute', bottom: "0px", display: 'flex', flexDirection: 'row' }}>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={newMessage}
                            style={{ width: '91%', height: '25px' }}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            Gửi
                        </button>
                    </div> */}
                    <Chatbox/>
                </div>
            </div>
        </div>
    )
}