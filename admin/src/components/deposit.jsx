
import React, { useState} from 'react';
import axios from 'axios';


export default function Transfer(){
    const [amount, setAmount] = useState(Number);
    const [receiveID, setReceiveID] = useState("");
    const [error, setError] = useState('');

    const Deposit = async () => {
        const newAmount = parseFloat(amount);
        const newdata ={
            amount: newAmount ,
            receiveID: receiveID 
        }
        console.log(newdata)
        try{
            const response = await axios.post("http://localhost:3002/transactions/depositadmin", newdata, {
                headers: { "Content-Type ": "application/json" }
            })  
            window.location.reload();
        }
        catch(error){
            if(error.response && error.response.status === 404){
                setError('Không tìm thấy người dùng')
            }else{
                console.log(error.message)
            }
        }    
    }
    return(
        <div style={{fontSize:'1.4em',padding:'30px', width:"300px", backgroundColor:"white"}}>
            <div className="deposit-header" style={{fontSize:'1.2em',fontWeight:'550',padding:'10px 0 20px '}}>
                Nạp tiền 
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
                    <div style={{paddingBottom:'5px'}}>Nhập số tiền muốn nạp</div>
                    <input 
                        type="text" 
                        style={{height:'30px', width:'250px'}} 
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                    />
                </div>
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px', fontSize:"0.9rem", color:"red"}}>{error}</div>                    
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Nạp tiền" 
                        style={{fontSize:'0.8em',color:'white',background:'rgb(10, 109, 200)',borderRadius:'5px',padding:'5px',border:'none'}} 
                        onClick={Deposit}
                    />
                </div>
            </div>
        </div>
    )
}