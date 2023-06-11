import { React, useContext, useEffect, useState } from "react";
import ImgContext from "../Context/ImgContext";
import AuthContext from "../Context/AuthContext";
import { db } from "../firebase";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import './Image.css'

import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import axios from "axios";

const Image = () => {

  // ReactGA.send({ hitType: "pageview", page: `${document.location.pathname}`, title: "Custom Title" });
  const { id } = useParams();
  const [loading, setIsLoading] = useState(false)

  const imgCtx = useContext(ImgContext);
  console.log(imgCtx);
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const [docs, setDocs] = useState(null);
  
  // the below useEffect function triggers an update of the firestore database in which the image's click value gets incremented by 1.
  useEffect(() => {
    console.log("this ran");
    const ref = doc(db, "images", id);
    const unsub = async () => {
      await updateDoc(ref, {
        clicks: increment(1),
      });
      console.log("done");
    };

    unsub();
    return () => {
      console.log("unmounted");
    };
  }, []);
  

  //UseEffect function to get the image url from firestore database using id from params
  useEffect(() => {
    
    console.log("this effect ran");

    const unsub = () => {
      setIsLoading(true)
      onSnapshot(doc(db, "images", id), (doc) => {
        console.log("ran");
        if (doc.exists()) {
          // console.log(doc.data());  // Here, we get the messages array from firebase
          doc.exists() && setDocs(doc.data());
        } else {
          console.error("Document does not exist:");
        }
        setIsLoading(false)
      });
    };

    unsub();
    return () => {
      console.log("mew");
    };
  }, [db]);
  return (
    <div className="imgViewer">
      {loading && <h1>loading Image...</h1>}
      {!loading && <img src={docs && docs.imageUrl} alt="" />}
    </div>
  );
};

export default Image;
