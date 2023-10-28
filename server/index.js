import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import { collection, doc,addDoc, setDoc, getDoc,getDocs, deleteDoc, getFirestore } from "firebase/firestore";
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js';
import bodyParser from "body-parser";


//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//conect db
const PORT = process.env.PORT || 6001;
let db;
export const connectDb = async () => {

    try {
        const firebaseConfig = {
            apiKey: "AIzaSyC5NnnKNXtgWqhUYTpe6j7o0lCfwBp4HQg",
            authDomain: "cdtt-1ba2a.firebaseapp.com",
            databaseURL: "https://cdtt-1ba2a-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "cdtt-1ba2a",
            storageBucket: "cdtt-1ba2a.appspot.com",
            messagingSenderId: "625667945221",
            appId: "1:625667945221:web:3e16e12bb7e1691489fd6c"
        };

        initializeApp(firebaseConfig);
        app.listen(PORT, () => console.log(`server port: ${PORT}`));
        db = getFirestore();


    } catch (err) {
        console.log(err);
    }
}
connectDb();

export const getDb = () => {
    return db;
}



//route
app.use('/users',userRoute);
app.use('/auth', authRoute);





