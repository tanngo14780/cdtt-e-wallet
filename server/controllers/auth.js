import {
    collection,
    doc,
    addDoc,
    getDoc,
    setDoc,
    getDocs,
    deleteDoc,
    where,
    query
} from "firebase/firestore";
import { getDb } from '../index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


//LOGIN
export const login = async (req, res) => {
    try {
        function compare(inPass, dataPass) {
            if(inPass === dataPass){
                return (true);
            }
            else{
                return (false);
            }
        }
        const usersCollection = collection(getDb(), 'Users');
        const q = query(usersCollection, where('userId', '==', req.body.userId));
        const userDetails = await getDocs(q);

        if (userDetails.empty) {
            // Không tìm thấy người dùng có username cụ thể
            return res.status(404).json({ status: 'failed', msg: 'User not found' });
        }

        const userDocRef = doc(usersCollection, userDetails.docs[0].id);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        userData.objectId = userDoc.id;
        
        const isMatch = await compare(req.body.password, userData.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
        
        const token = jwt.sign(
            { id: userData.objectId, role: userData.role},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        delete userData.password;
        
        return res.status(200).json({userData, token})

    } catch (error) {
        console.error(error);
        return res.status(500).json(err);
    }
};

export const loginAdmin = async (req, res) => {
    try {
        function compare(inPass, dataPass) {
            if(inPass === dataPass){
                return (true);
            }
            else{
                return (false);
            }
        }
        const usersCollection = collection(getDb(), 'Users');
        const q = query(usersCollection, where('userId', '==', req.body.userId));
        const userDetails = await getDocs(q);

        if (userDetails.empty) {
            // Không tìm thấy người dùng có username cụ thể
            return res.status(404).json({ msg: 'User not found' });
        }

        const userDocRef = doc(usersCollection, userDetails.docs[0].id);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        userData.objectId = userDoc.id;

        if (userData.role !== "admin") return res.status(403).json({ msg: "Access denied" });

        const isMatch = await compare(req.body.password, userData.password);
        if (!isMatch) return res.status(402).json({ msg: "Incorrect password" });
        
        const token = jwt.sign(
            { id: userData.objectId, role: userData.role},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        delete userData.password;
        
        res.status(200).json({token, userData});

    } catch (error) {
       res.status(500).json(error);
    }
};


