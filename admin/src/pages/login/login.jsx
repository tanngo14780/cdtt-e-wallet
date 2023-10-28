import './login.css';
import {useDispatch, useSelector} from 'react-redux';
import { setLogin } from '../../state.js';
import axios from 'axios';
import { useState } from 'react';

export default function Login(){
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state)
    const [userId , setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async(e) =>{
        e.preventDefault();
        const form ={userId, password};
        console.log(form);
        try{
            const response = await axios.post("http://localhost:3002/auth/login/admin", form, {
                headers: { "Content-Type": "application/json" },
            });
            const loggedIn = response.data;
        
        if (loggedIn) {
            dispatch(
            setLogin({
                userdata: loggedIn.userData,
                token: loggedIn.token,             
            })
            );
            console.log(token);
            
        }
        }
        catch(error){
            if (error.response) {
                if (error.response.status === 404) {
                    setError('Không tìm thấy người dùng');
                } else if (error.response.status === 403) {
                    setError('Không đủ quyền truy cập tài nguyên này');
                } else if (error.response.status === 402) {
                    setError('Mật khẩu sai');
                }
            } else {
                setError('Lỗi không xác định');
            }
        }
        
        
    }
    return(
        <div className='Login'>
            <div className="form">
                <form action="">
                    <div className="frm-content logo">
                        <img src="https://daihocchinhquy.neu.edu.vn/Content/logo/neu-logo.png" alt="logo" style={{width:150}} />
                        
                    </div>
                    <div className="frm-content" style={{fontWeight:700}}>
                        TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN
                    </div>
                    <div className="frm-content">
                        Cổng thông tin đào tạo
                    </div>
                    <div className="frm-content" style={{fontWeight:700}}>
                        Admin ID
                    </div>
                    <div className="frm-content">
                        <input 
                            type="text" 
                            className='input-text'
                            label="userId"
                            name="userId"
                            placeholder='userId'
                            onChange={(e)=> setUserId(e.target.value)}
                        />
                    </div>
                    <div className="frm-content"style={{fontWeight:700}}>
                        Password
                    </div>
                    <div className="frm-content">
                        <input 
                            type="text" 
                            className='input-text'
                            label="password"
                            name="password"
                            placeholder='password'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="frm-content">
                        {error}
                    </div>
                    <div className="frm-content">
                        <button type="submit" className='submit-btn' onClick={handleLogin}>Login</button>
                    </div>                 
            </form>
            </div>            
        </div>
    )
}