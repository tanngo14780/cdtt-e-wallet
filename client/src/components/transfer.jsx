import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function Transfer(){
    const userdata = useSelector((state) => state.userdata);
    const [amount, setAmount] = useState('');
    const [receiveID, setReceiveID] = useState("");
    const [error, setError] = useState('');

    const Transfer = async () => {
        const newAmount = parseFloat(amount);
        const newdata ={
            objectId: userdata.objectId,
            amount: newAmount ,
            receiveID: receiveID 
        }
        try{
            const response = await axios.post("http://localhost:3002/transactions/transfer", newdata, {
                headers: { "Content-Type ": "application/json" }
            })
            setError("Giao dịch thành công");
        }
        catch(error){
            if(error.response.status === 404){
                setError('Không tìm thấy người dùng')
            }else{
                if(error.response.status === 403){
                    setError('Số dư không đủ')
                }else{
                    console.log("Không xác định")
                }
            }
        }    
    }
    return(
        <div style={{fontSize:'1.4em',paddingBottom:'10px'}}>
            <div className="deposit-header" style={{fontSize:'1.2em',fontWeight:'550',padding:'10px 0 20px '}}>
                Chuyển tiền
            </div>
            <div className="deposit-body" >
                <div style={{paddingBottom:'30px',position:'relative'}}>
                    <div style={{paddingBottom:'5px'}}>Người nhận</div>
                    <input 
                        type="text" 
                        style={{height:'30px', width:'250px'}} 
                        value={receiveID}
                        onChange={(e)=>setReceiveID(e.target.value)}
                    />
                </div>                
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px'}}>Nhập số tiền muốn chuyển</div>
                    <input 
                        type="text" 
                        style={{height:'30px', width:'250px'}} 
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                    />
                </div>
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px'}}>{error}</div>                    
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Chuyển tiền" 
                        style={{fontSize:'0.8em',color:'white',background:'rgb(10, 109, 200)',borderRadius:'5px',padding:'5px',border:'none'}} 
                        onClick={Transfer}
                    />
                </div>
            </div>
        </div>
    )
}