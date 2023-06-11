import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AuthContext from "./AuthContext";
import ImgContext from "./ImgContext";

const ImgProvider = (props)=>{

  const [currentImg , setCurrentImg] = useState('');

  

  return <ImgContext.Provider value={{currentImg: currentImg, setCurrentImg: setCurrentImg}}>
   {props.children}
  </ImgContext.Provider>
}
export default ImgProvider