import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser" style={{borderRadius:'10px', height: 'auto', width: '98%', backgroundColor:'white',padding:'15px' }}>
      <h1 className="newUserTitle">Tạo người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input type="text" placeholder="Nguyễn văn A" />
        </div>   
        <div className="newUserItem">
          <label>Mã sinh viên</label>
          <input type="text" placeholder="11203502" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="1" />
        </div>
        <div className="newUserItem">
          <label>Số dư tài khoản</label>
          <input type="text" placeholder="000000" />
        </div>
        <div className="newUserItem">
          <label>Thẻ thanh toán</label>
          <input type="text" placeholder="usdjsk12312321" />
        </div> 
        <div className="newUserItem">
          <label>Học phí</label>
          <input type="text" placeholder="00000000" />
        </div>
        <button className="newUserButton">Thêm</button>
      </form>
    </div>
  );
}
