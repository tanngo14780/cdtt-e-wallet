import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
export default function Transfer(){
    return(
        <div style={{fontSize:'1.4em',paddingBottom:'10px'}}>
            <div className="deposit-header" style={{fontSize:'1.2em',fontWeight:'550',padding:'10px 0 20px '}}>
                Chuyển tiền
            </div>
            <div className="deposit-body" >
                <div style={{paddingBottom:'30px',position:'relative'}}>
                    <div style={{paddingBottom:'5px'}}>Tìm người nhận</div>
                    <input type="text" style={{height:'30px', width:'250px'}} />
                    <div style={{position:'absolute', top:'37px', right:'0' }}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </div>
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px'}}>Ngô Khôn Tấn / 11203502</div>                    
                </div>
                <div style={{paddingBottom:'30px'}}>
                    <div style={{paddingBottom:'5px'}}>Nhập số tiền muốn chuyển</div>
                    <input type="text" style={{height:'30px', width:'250px'}} />
                </div>
                <div>
                    <input type="submit" value="Chuyển tiền" style={{fontSize:'0.8em',color:'white',background:'rgb(10, 109, 200)',borderRadius:'5px',padding:'5px',border:'none'}} />
                </div>
            </div>
        </div>
    )
}