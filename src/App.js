// import './App.css';
import AuthContext from './Context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Image from './pages/Image';
import ImgProvider from './Context/ImgProvider';
import ReactGA from "react-ga4";


function App() {

  
  const authCtx = useContext(AuthContext);
  
  //the below function changes the current route if user is logged in and prevents routing to login page if user refreshes the page.
  const ProtectedRoute = ({children})=>{
    if(!authCtx.currentUser){
      return <Navigate to='/login'/> // changes the current location when it is rendered
    }
    return children;
  }
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="login" element = {<Login/>} />
      <Route path="register" element={<Register/>}/>
      <Route path="image/:id" element={<ImgProvider><Image/></ImgProvider>}/>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
