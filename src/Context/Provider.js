import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AuthContext from "./AuthContext";

const Provider = (props)=>{

  const [currentUser , setCurrentUser] = useState({});

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{   // this checks if user has logged in already or not
      setCurrentUser(user);
    });
    // we must use a cleanup function when we listen to any real time function
    return ()=>{
     unsub();
    }
  })

  return <AuthContext.Provider value={{currentUser: currentUser}}>
   {props.children}
  </AuthContext.Provider>
}
export default Provider