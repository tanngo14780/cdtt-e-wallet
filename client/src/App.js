import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';
import Return from './pages/returnVnpay';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/homepage" /> : <Login />}
          />
        </Routes>
        {isAuth ? (
          <>
            <Routes>
                  <Route path="/homepage" element={<Homepage /> } />
                  <Route path="/deposit/vnpay_return" element={<Return/>}/>
            </Routes>
          </>
        ) : <Navigate to ="/login"/>}
      </div>
    </Router>
  );
}

export default App;
