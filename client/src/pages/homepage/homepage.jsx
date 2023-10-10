import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';

export default function Home(){
    return(
        <body className="Homepage">
            <div className="container">
                <div className="section section-1">
                    <div className="bg-section1">
                        <img src="https://daihocchinhquy.neu.edu.vn/Content/logo/banner-yersin.jpg" alt="Dhktqd" />
                    </div>
                    <div className="header1">
                        <div className="header1-content">Trang chủ</div>
                        <div className="header1-content">
                             <div>11203502 | Ngô Khôn Tấn </div>
                             <div className='profile-doggle'></div>
                        </div>
                    </div>
                </div>
                <div className="section section-2">
                    <div className="section-content function">
                        <div className="content-header">
                            <div className="header-container">
                                <div className='box-icon'>
                                    <FontAwesomeIcon icon={faBars}/>
                                </div>
                                <div className='funtion-header'>Chức năng</div>
                            </div>
                        </div>
                        <div className='content-body'>
                            <div className="function-body">
                                <ul>
                                    <li>Thông tin cá nhân</li>
                                    <li>Chương trình đào tạo</li>
                                    <li>Tài chính sinh viên</li>
                                    <li>Ví điện tử</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="section-content function-content">
                        <div className="content-header ">
                            Thông tin sinh viên
                        </div>
                        <div className="content-body">
                            component
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
        </body>
    )
}