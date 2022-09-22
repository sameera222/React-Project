import './App.css';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"


function App() {
  return (
    <div className="App">
      
         <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/homePage" element={<HomePage/>}/>
         </Routes>
      
       
    </div>
  );
}

export default App;
