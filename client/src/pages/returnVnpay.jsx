import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import queryString from 'querystring'
export default function Return() {

    const [result, setResult] = useState("");

    const Result = async () => {

        try {
            const currentURL = window.location.href;

        // Tách URL thành phần path và phần query
        const [path, queryPart] = currentURL.split('?');

        // Lấy phần query sau dấu '?'
        const queryString = queryPart || '';
            const response = await axios.get(`http://localhost:3002/vnpay/vnpay_return?${queryString}`);
            setResult("Nạp tiền thành công")       
        }
        catch (error) {
            if(error.response){
                setResult("Nạp tiền thất bại")
            }
        }
    }
    useEffect(() => {
        Result()
    }, [])
    

    return (
        <div className="container">
            <p style={{ textAlign: "center", color: "red" }}>{result}</p>
            <p style={{ textAlign: "center" }}>
                <a href="/homepage" className="btn btn-default">Quay về trang chủ</a>
            </p>
        </div>
    )
}