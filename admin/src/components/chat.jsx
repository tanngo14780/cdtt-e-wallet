import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
export default function Chat(){
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className="chat-body" style={{display:'flex', flexDirection:'row',width:'auto'}}>
                <div className="chat-list" style={{background:'white',margin:'0 30px',padding:'10px 20px', borderRadius:'10px', border:'1px black solid'}}>
                    <div style={{fontSize:'2em', fontWeight:'700',padding:'20px 10px'}}>Cuộc trò chuyện của tôi</div>
                    <div>
                        <ul>
                            <li>
                                <div style={{fontSize:'1.5em',background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'10px 20px', marginBottom:'10px'}}>Nguyen van a</div>
                            </li>
                            <li>
                                <div style={{fontSize:'1.5em',background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'10px 20px', marginBottom:'10px'}}>Nguyen van a</div>
                            </li><li>
                                <div style={{fontSize:'1.5em',background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'10px 20px', marginBottom:'10px'}}>Nguyen van a</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="boxchat" style={{borderRadius:'10px',position:'relative', background:'white',border:'1px black solid', height:'500px', width:'600px'}}>
                    <div className="chat-feed" style={{fontSize:'1.3em',padding:'0px 40px 50px',width:'87%',position:'absolute', bottom:"30px"}}>
                        <div>fadsfasdfasdfsafsaaf</div>
                        <div>fadsfasdfasdfsafsaaf</div>
                        <div>fadsfasdfasdfsafsaaf</div>
                        <div>xyz</div>
                        <div>xyz</div>
                        <div>xyz</div>
                        <div>xyz</div>
                    </div>
                    <div style={{width:'100%',position:'absolute', bottom:"0px",display:'flex',flexDirection:'row'}}>
                        <input type="text" name="" id="" style={{width:'90%',height:'50px',borderRadius:'10px',fontSize:'1.1em',padding:'0 10px'}}/>
                        <input type="submit" value="Gửi" style={{width:'55px',borderRadius:'10px'}} />
                    </div>
                </div>
            </div>
        </div>
    )
}