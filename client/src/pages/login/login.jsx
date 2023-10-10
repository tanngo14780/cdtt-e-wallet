
import './login.css';

export default function Login(){
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
                        Student ID
                    </div>
                    <div className="frm-content">
                        <input type="text" className='input-text'/>
                    </div>
                    <div className="frm-content"style={{fontWeight:700}}>
                        Password
                    </div>
                    <div className="frm-content">
                        <input type="text" className='input-text' />
                    </div>
                    <div className="frm-content">
                        <input type="submit" name="submit" id="submit-btn" />
                        <label htmlFor="submit" className='submit-btn'>Đăng nhập</label>
                    </div>
            </form>
            </div>            
        </div>
    )
}