import "./sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
    
    return (
        <div style={{ height:'600px', width: '17%', backgroundColor:'rgb(10, 109, 200)'}}>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Admin Manage</h3>
                <ul className="sidebarList">
                    <Link to="/homepage" className="link">
                        <li className="sidebarListItem">
                            Home
                        </li>
                    </Link>
                    <Link to="/users" className="link">
                        <li className="sidebarListItem">
                            Users
                        </li>
                    </Link>                    
                    <Link to="/services" className="link">
                        <li className="sidebarListItem">
                            Services 
                        </li>
                    </Link>
                    <Link to="/transactions" className="link">
                        <li className="sidebarListItem">
                            Transactions 
                        </li>
                    </Link>
                    <Link to="/chat" className="link">
                        <li className="sidebarListItem">
                            Chat
                        </li>
                    </Link>
                    <Link to="/addUser" className="link">
                        <li className="sidebarListItem">
                            Add User
                        </li>
                    </Link>
                    
                </ul>
                <div>
                    <div className="logout-btn" style={{textAlign:'center', paddingTop:'10px'}}>
                        <input type="submit" value="Log out" style={{width:'120px',height:'30px',fontWeight:600}} />
                    </div>
                </div>
            </div>
        </div>
    )
}