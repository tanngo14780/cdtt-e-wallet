import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
export default function Chat(){
    return(
        <div>
            <div className="chat-header" style={{marginBottom:'20px'}}>
                <div>Tìm người trò chuyện</div>
                <div className="search-chat" style={{position:'relative'}}>
                    <input type="text" style={{width:'300px',height:'20px'}}/>
                    <div style={{position:'absolute', top:'5px', left:'280px' }}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </div>
            </div>
            <div className="chat-body" style={{display:'flex', flexDirection:'row'}}>
                <div className="chat-list" style={{background:'white',padding:'10px 20px', border:'1px black solid'}}>
                    <div style={{fontSize:'1.2em', fontWeight:'700',paddingBottom:'10px'}}>Cuộc trò chuyện của tôi</div>
                    <div>
                        <ul>
                            <li>
                                <div style={{background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'5px 10px'}}>Nguyen van a</div>
                            </li>
                            <li>
                                <div style={{background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'5px 10px'}}>Nguyen van a</div>
                            </li><li>
                                <div style={{background: 'rgba(0,0,0,0.15)',borderRadius:'5px', padding:'5px 10px'}}>Nguyen van a</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="boxchat" style={{position:'relative', background:'white',border:'1px black solid', height:'400px', width:'500px'}}>
                    <div className="chat-feed" style={{padding:'10px',width:'100%',position:'absolute', bottom:"30px"}}>
                        <div>abc</div>
                        <div>xyz</div>
                        <div>xyz</div>
                        <div>xyz</div>
                        <div>xyz</div>
                    </div>
                    <div style={{width:'100%',position:'absolute', bottom:"0px",display:'flex',flexDirection:'row'}}>
                        <input type="text" name="" id="" style={{width:'91%',height:'25px'}}/>
                        <input type="submit" value="Gửi" />
                    </div>
                </div>
            </div>
        </div>
    )
}