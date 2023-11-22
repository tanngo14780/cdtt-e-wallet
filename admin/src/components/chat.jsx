
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
  

    return (
        <div>
            <div className="chat-body" style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="chat-list" style={{ background: 'white', padding: '30px 20px',height:"500px",width:"250px", border: '1px black solid' }}>
                    <div className="chat-header" style={{ marginBottom: '20px' }}>
                        <Search/>
                    </div>
                    <div style={{ fontSize: '1.5em', fontWeight: '700', paddingBottom: '10px' }}>Cuộc trò chuyện của tôi</div>
                    <div style={{overflowY:'auto', height:"75%"}}>
                       <Chats/>
                    </div>
                </div>
                <div className="boxchat" style={{ position: 'relative', background: 'white', border: '1px black solid', height: '560px', width: '600px' }}>
                    <Chatbox/>
                </div>
            </div>
        </div>
    )
}