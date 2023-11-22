import {
    collection,
    doc,
    addDoc,
    getDoc,
    setDoc,
    getDocs,
    where,
    query,
    Timestamp
} from "firebase/firestore";
import { getDb } from '../index.js';
import * as firebase from 'firebase/app';


export const thanhtoan = async (req, res) => {
    try {
        //lay user voiw userId = cardid
        const usersCollection = collection(getDb(), "Users");
        const q = query(usersCollection, where('cardID', '==', req.body.cardID));
        const userDetails = await getDocs(q);
        if (userDetails.empty) {
            // Không tìm thấy người dùng có username cụ thể
            return res.status(404).json({ status: 'failed', msg: 'User not found' });
        }

        const userDocRef = doc(usersCollection, userDetails.docs[0].id);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // lay amount voi servicename = serviceName

        const servicesCollection = collection(getDb(), "services");
        const q2 = query(servicesCollection, where('serviceName', '==', req.body.serviceName));
        const svDetails = await getDocs(q2);
        if (svDetails.empty) {
            // Không tìm thấy người dùng có username cụ thể
            return res.status(405).json({ status: 'failed', msg: 'Service not found '});
        }

        const svDocRef = doc(servicesCollection, svDetails.docs[0].id);
        const svDoc = await getDoc(svDocRef);
        const svData = svDoc.data();

        //kiem tra so du
        if (userData.balance < svData.amount) {
            return res.status(403).json("so du khong du")
        }

        const newbalance = userData.balance - svData.amount;


        // update balanceamount
        const updateSend = await setDoc(userDocRef, { balance: newbalance }, { merge: true });


        //add userhistory
        const message = "Thanh toán "+req.body.serviceName
        const currentTimestamp = Timestamp.fromDate(new Date());
        const newdata = {
            Timestamp: currentTimestamp,
            type: req.body.serviceName,
            userId: userData.userId,
            amount: parseFloat(svData.amount),
            message: message
        }
        const historiesCollection = collection(getDb(), "userhistories");
        const history = await addDoc(historiesCollection, newdata);

        const historyDocRef = doc(historiesCollection, history.id);
        const historyDoc = await getDoc(historyDocRef);
        const hisData = historyDoc.data();
        return res.status(200).send({ msg:"thanh cong" ,newdata });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}