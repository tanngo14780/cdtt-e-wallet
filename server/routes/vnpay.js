import express from 'express';
import $ from 'jquery';
import dateFormat from 'dateformat'
import config from 'config'
import querystring from 'qs'
import crypto from 'crypto'
import moment from 'moment'
import { getDb } from '../index.js';
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



const router = express.Router();

router.post('/create_payment_url', function (req, res, next) {
    var date = new Date();
    var createDate = moment(date).format('YYYYMMDDHHmmss');

    var ipAddr = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress

    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');
    var vnpUrl = config.get('vnp_Url');
    var returnUrl = config.get('vnp_ReturnUrl');

    var orderId = moment(date).format('DDHHmmss');
    var amount = req.body.amount;
    var bankCode = '';

    var orderInfo = req.body.userId;

    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = "250000";
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);


    var signData = querystring.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // res.redirect(vnpUrl)

    res.send(vnpUrl)
});


router.get('/vnpay_return', async function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const resCode = vnp_Params['vnp_ResponseCode']
    const userId = vnp_Params['vnp_OrderInfo']
    const amount = parseFloat(vnp_Params['vnp_Amount'])
    const sendId = vnp_Params['vnp_BankCode']


    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');


    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        if (resCode === '00') {
            try {
                //lay user theo userID
                const usersCollection = collection(getDb(), "Users");
                const q = query(usersCollection, where('userId', '==', userId));
                const userDetails = await getDocs(q);
                if (userDetails.empty) {
                    // Không tìm thấy người dùng có username cụ thể
                    return res.status(404).json({ status: 'failed', msg: 'User not found' });
                }

                const userDocRef = doc(usersCollection, userDetails.docs[0].id);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                const name = userData.username;
                const newbalance = userData.balance + amount/100;

                //update 
                const updateBalance = await setDoc(userDocRef, { balance: newbalance }, { merge: true });

                //add transactions

                const currentTimestamp = Timestamp.fromDate(new Date());
                const newdata = {
                    type: "Nạp tiền",
                    createID: sendId ,
                    receiverName: name,
                    createTime : currentTimestamp,
                    amount: amount/100,
                    method: "VNPAY Payment Gateway",
                    receiveID: userId,
                }
                const tranCollection = collection(getDb(), "transactions");
                const newDocRef = await addDoc(tranCollection, newdata);
        

                return res.status(200).send({doc :newDocRef.id});
            }
            catch (error) {
                res.status(500).send(error.message)
            }
            
        } else {
            res.status(401).send("Khong thanh cong")
        }

    } else {
        res.status(400).send("Chữ ký sai")
    }
});



function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
// Vui lòng tham khảo thêm tại code demo


export default router;