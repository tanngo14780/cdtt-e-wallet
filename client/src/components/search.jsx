import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection,addDoc, query, getDocs, where, getDoc, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useSelector } from "react-redux";
export default function Search() {

    const [userid, setUserid] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState("");
    const [chatid, setChatid] = useState(null);
    const userdata = useSelector((state) => state.userdata);

    const handleSearch = async () => {
        if (userid === userdata.userId) {
            setErr("Không thể tìm kiếm bản thân")
        } else {
            
            setUser(null);
            const q = query(
                collection(db, "Users"),
                where("userId", "==", userid)
            )
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUser(doc.data())
                })

            }
            catch (err) {
                setErr("Khong tim thay nguoi dung")
            }
        }
    }

    const handleKey = e => {
        setErr("")
        e.key === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        try {
            //Kiểm tra xem đã có cuộc trò chuyện chưa
            const sortedUserIds = [userdata.userId, userid].sort();

            const q = query(
                collection(db, "Chat"),
                where("usersID", "==", sortedUserIds)
            )

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const room = []
                querySnapshot.forEach((doc) => {
                    const Chat = doc.data();
                    Chat.chatId = doc.id;
                    room.push(Chat);
                })
                setChatid(room[0].chatId)
            }
            else {
                const docRef = await addDoc(collection(db, "Chat"), {
                    usersID: sortedUserIds,
                    lastMess: "",
                    updateTime: serverTimestamp(),
                });
                setChatid(docRef.id);
            }
     
        }
        catch (err) {
            console.log(err.message)
        }
        setUser(null);
        setUserid("");
    }


    return (
        <div>
            <div style={{ fontSize: '1.2em', fontWeight: '700', paddingBottom: '10px' }}>Tìm người trò chuyện</div><div className="search-chat" style={{ position: 'relative' }}>
                <input
                    type="text"
                    style={{ width: '100%', height: '20px' }}
                    onKeyDown={handleKey}
                    onChange={(e) => setUserid(e.target.value)}
                    value={userid}
                />
            </div>
            {user &&
                <div onClick={handleSelect} style={{ marginTop: "3px", background: 'rgba(0,0,0,0.15)', borderRadius: '5px', padding: '5px 10px' }}>
                    <div className="userChatInfo">
                        <span>{user.username}</span>
                    </div>
                </div>}
            {err &&
                <div>
                    <span style={{ color: "red" }} >{err}</span>
                </div>
            }
        </div>
    )
}