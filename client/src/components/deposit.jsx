export default function Deposit(){
    return(
        <div style={{fontSize:'1.4em',paddingBottom:'10px'}}>
            <div className="deposit-header" style={{fontSize:'1.2em',fontWeight:'550',padding:'10px 0 20px '}}>
                Nạp tiền
            </div>
            <div className="deposit-body" >
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px'}}>Nhập số tiền muốn nạp</div>
                    <input type="text" style={{height:'20px', width:'250px'}} />
                </div>
                <div style={{paddingBottom:'10px'}}>
                    Chọn phương thức thanh toán:
                    <div>
                        <input type="radio" name="payment" id="payment1" />
                        <label htmlFor="payment1">Ví zalopay</label>
                    </div>
                    <div>
                        <input type="radio" name="payment" id="payment2" />
                        <label htmlFor="payment2">Thẻ ATM</label>
                    </div><div>
                        <input type="radio" name="payment" id="payment3" />
                        <label htmlFor="payment3">Visa/Mastercard</label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Thanh toán qua cổng zalopay" style={{color:'white',background:'rgb(10, 109, 200)',borderRadius:'5px',padding:'5px',border:'none'}} />
                </div>
            </div>
        </div>
    )
}