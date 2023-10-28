import "./newUser.css";
import axios from 'axios';
import { useState } from 'react';

export default function NewUser() {
  const [userId , setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState('');
  const [cardID, setCardid] = useState('');
  const [tuition, setTuition] = useState('');
  const handleAddnew =async (e)=>{
    const form = {
      username,
      userId,
      password: "1",
      balance,
      cardID,
      tuition,
      role:"user"
    }
    console.log(form);

    try{
      await axios.post("http://localhost:3002/users/create", form,{
        headers : { "Content-Type ": "application/json"}
      })
    }
    catch(error){
      if(error.response && error.response.status === 500)
        console.log(error.response);
      }
  }
  
  return (
    <div className="newUser" style={{borderRadius:'10px', height: 'auto', width: '98%', backgroundColor:'white',padding:'15px' }}>
      <h1 className="newUserTitle">Tạo người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input 
            type="text" 
            placeholder="Nguyễn văn A"
            onChange={(e)=>setUsername(e.target.value)}  
          />
        </div>   
        <div className="newUserItem">
          <label>Mã sinh viên</label>
          <input type="text" placeholder="11203502" onChange={(e)=>setUserId(e.target.value)}  />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="Defaul: 1" disabled />
        </div>
        <div className="newUserItem">
          <label>Số dư tài khoản</label>
          <input type="text" placeholder="1000000" onChange={(e)=>setBalance(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Thẻ thanh toán</label>
          <input type="text" placeholder="usdjsk12312321" onChange={(e)=>setCardid(e.target.value)} />
        </div> 
        <div className="newUserItem">
          <label>Học phí</label>
          <input type="text" placeholder="00000000" onChange={(e)=>setTuition(e.target.value)} />
        </div>
        <button type="button" className="newUserButton" onClick={handleAddnew}>Thêm</button>
      </form>
    </div>
  );
}
