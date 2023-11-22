import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';


import axios from 'axios';
export default function Deposit() {
    const userdata = useSelector((state) => state.userdata);
    const [amount, setAmount] = useState("");

    const handlePayment = async () => {
        // const history = useHistory();
        try{
        const form ={
            amount : amount,
            userId : userdata.userId
        }
        const response = await axios.post("http://localhost:3002/vnpay/create_payment_url", form);
        
        window.location.replace(response.data);

        
       }
       catch(error){
        console.error("Lỗi khi gọi API:", error);
       }
    };


    return (
        <div style={{ fontSize: '1.4em', paddingBottom: '10px' }}>
            <div className="deposit-header" style={{ fontSize: '1.2em', fontWeight: '550', padding: '10px 0 20px ' }}>
                Nạp tiền
            </div>
            <div className="deposit-body" >
                <div style={{ paddingBottom: '30px' }}>
                    <div style={{ paddingBottom: '5px' }}>Nhập số tiền muốn nạp</div>
                    <input
                        type="text"
                        style={{ height: '20px', width: '250px' }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={handlePayment}
                        style={{
                            color: "white",
                            background: "rgb(10, 109, 200)",
                            borderRadius: "5px",
                            padding: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Thanh toán qua cổng VNPAY
                    </button>
                </div>
            </div>
        </div>
    )
}