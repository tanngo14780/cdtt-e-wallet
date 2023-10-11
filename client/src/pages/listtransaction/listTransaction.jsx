export default function ListTransaction(){
    return(
        <div style={{fontSize:'1.4em',border:"1px black solid",background:'white',padding:'10px'}}>
            <div style={{display:'flex',justifyContent:'center',padding:'10px 0',fontSize:'1.3em',fontWeight:'700'}}>Lịch sử giao dịch</div>
            <div className="box-list" style={{border:"1px black solid",background:'white',padding:'10px'}}>
                <ul>
                    <li>
                        <div style={{width:'50%',height:'auto',background:'rgba(0,0,0,0.15)',borderRadius:'5px',padding:"10px"}}>
                            giao dich 1
                        </div>
                    </li>
                    <li>
                        <div style={{width:'50%',height:'auto',background:'rgba(0,0,0,0.15)',borderRadius:'5px',padding:"10px"}}>
                            giao dich 1
                        </div>
                    </li><li>
                        <div style={{width:'50%',height:'auto',background:'rgba(0,0,0,0.15)',borderRadius:'5px',padding:"10px"}}>
                            giao dich 1
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}