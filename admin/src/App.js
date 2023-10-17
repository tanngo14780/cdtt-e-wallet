import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import Homepage from './pages/homepage/homepage';
import Userlist from './pages/userlist'
import Transactionlist from './pages/transactionlist';
import Chat from './components/chat';
import Service from './pages/services';
import Login from './pages/login/login';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header';
import NewUser from './pages/newUser/NewUser';

export default function App() {  
  // const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Router>
      <div className="App">   
      <Header/>
      <div className='container' style={{display:'flex',flexDirection:'row'}}>
        <Sidebar/>    
        <div style={{width:'80%',padding:"20px", backgroundColor:"rgba(0,0,0,0.15)"}}>
          <Routes>
              <Route path="/login" element={ <Login /> } />
              <Route path="/homepage" element={  <Homepage /> } />
              {/* <Route path="/users" element={isAuth ? <UserList /> : <Navigate to='/login'/>} /> */}
              <Route path="/users" element={  <Userlist /> } />
              <Route path="/transactions" element={  <Transactionlist /> } />
              <Route path="/chat" element={  <Chat/> } />
              <Route path="/services" element={  <Service/> } />
              <Route path="/addUser" element={  <NewUser/> } />
            </Routes>  
        </div>    
      </div>
        
      </div>
    </Router>
  );
}