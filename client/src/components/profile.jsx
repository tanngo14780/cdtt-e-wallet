import React, { useState } from 'react';
import EditPassword from './editpassword';
export default function Profile(){
    const [showEditPassword, setShowEditPassword] = useState(false);

    const handleButtonClick = () => {
        setShowEditPassword(true);
    };
    return(
        <div style={{backgroundColor:'white', padding:'20px'}}>
            <div className="header-profile" style={{fontSize : '2em', fontWeight :'700',margin :'0 auto', display:'flex', justifyContent :'center' } }>
                <div>Thông tin cá nhân</div>
            </div>
            <div className="body-profile" style={{padding : '30px 30px', fontSize :'1.3em'}}>
                <div className="body-section">
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Họ và tên:</div>
                        <div style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>Ngô Khôn Tấn</div>
                    </div>
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Mã sinh viên:</div>
                        <div style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>11203502</div>
                    </div>
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Password:</div>
                        <div  style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>abc</div>
                    </div>
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Số dư tài khoản:</div>
                        <div style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>1000000vnd</div>
                    </div>                    
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Thông tin thẻ thanh toán:</div>
                        <div style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>13215456462132</div>
                    </div>
                    <div className="info" style={{padding:'5px'}}>
                        <div style={{fontWeight:600, paddingBottom:'3px'}}>Tình hình học phí:</div>
                        <div style={{padding:'10px', paddingLeft:'20px',borderRadius:'10px', background:' rgba(0,0,0,0.15)'}}>Nợ học phí</div>
                    </div>
                    <div className="info" style={{padding:'5px'}}>
                        <div className="button">
                            <input type="submit" onClick={handleButtonClick} value="Đổi mật khẩu" style={{width:'120px', height:'30px'}} />
                            {/* {showEditPassword && <EditPassword/>} */}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}