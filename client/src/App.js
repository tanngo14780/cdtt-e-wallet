import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useSelector } from "react-redux";
import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';

function App() {  
  // const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Router>
      <div className="App">       
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route path="/homepage" element={  <Homepage /> } />
          </Routes>      
      </div>
    </Router>
  );
}

export default App;
