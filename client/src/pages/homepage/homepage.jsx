import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../components/profile';
import { Chat } from "../../components/chat";
import Transaction from '../transaction/transaction';
import ListTransaction from '../listtransaction/listTransaction';
import UserActivities from '../../components/useractivities';
import React, { useState, Link } from 'react';
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

export default function Home() {
    const [selectedOption, setSelectedOption] = useState('A');   
    const [room, setRoom] = useState(""); 
    const dispatch = useDispatch();
    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };
    return (
        <div className="Homepage">
            <div className="container">
                <div className="section section-1">
                    <div className="bg-section1">
                        <img src="https://daihocchinhquy.neu.edu.vn/Content/logo/banner-yersin.jpg" alt="Dhktqd" />
                    </div>
                    <div className="header1">
                        <div className="header1-content">Trang chủ</div>
                        <div className="header1-content" style={{ display: 'flex', flexDirection: 'row' }}>
                            
                            <div className='log-out'>
                                <button
                                    type="submit"                                
                                    onClick={() => dispatch(setLogout())}>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section-2">
                    <div className="section-content function">
                        <div className="content-header">
                            <div className="header-container">
                                <div className='box-icon'>
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                                <div className='funtion-header'>Chức năng</div>
                            </div>
                        </div>
                        <div className='content-body'>
                            <div className="function-body">
                                <ul>
                                    <li>
                                        <div>
                                            <input
                                                type="radio"
                                                name="radioOptions"
                                                value="A"
                                                checked={selectedOption === 'A'}
                                                onChange={handleRadioChange}
                                                id="cb1"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="cb1">Thông tin cá nhân</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="radio"
                                                name="radioOptions"
                                                value="C"
                                                checked={selectedOption === 'C'}
                                                onChange={handleRadioChange}
                                                id="cb3"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="cb3">Thực hiện giao dịch</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="radio"
                                                name="radioOptions"
                                                value="B"
                                                checked={selectedOption === 'B'}
                                                onChange={handleRadioChange}
                                                id="cb2"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="cb2">Lịch sử hoạt động</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="radio"
                                                name="radioOptions"
                                                value="D"
                                                checked={selectedOption === 'D'}
                                                onChange={handleRadioChange}
                                                id="cb4"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="cb4">Lịch sử giao dịch</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="radio"
                                                name="radioOptions"
                                                value="F"
                                                checked={selectedOption === 'F'}
                                                onChange={handleRadioChange}
                                                id="cb6"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="cb6">Chat</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="section-content function-content">
                        <div className="content-header ">
                            Ví điện tử
                        </div>
                        <div className="content-body">
                            {selectedOption === 'A' && <Profile />}
                            {selectedOption === 'B' && <UserActivities />}
                            {selectedOption === 'C' && <Transaction />}
                            {selectedOption === 'D' && <ListTransaction />}
                            {selectedOption === 'F' && <Chat />}

                        </div>
                    </div>
                </div>
                <div className="section section-3">
                    <div className="footer">
                        <div>Phòng quản lý và đào tạo</div>
                        <div>Địa chỉ: PHÒNG 210 - 211 - 213 TẦNG 2 - NHÀ A1 - TRƯỜNG ĐH KINH TẾ QUỐC DÂN</div>
                        <div>Website: daotao.neu.edu.vn | Email: daotao@neu.edu.vn - phqldt@neu.edu.vn - phongqldtktqd@gmail.com</div>
                        <div>Điện thoại: (84)24.36.280.280 - Fax: (84)24.38.695.992</div>
                    </div>
                </div>
            </div>
        </div>
    )
}