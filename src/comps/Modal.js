import React from "react";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import ImgContext from "../Context/ImgContext";
import ImgProvider from "../Context/ImgProvider";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../Context/AuthContext";

const Modal = (props) => {
  const authCtx = useContext(AuthContext);
  const imgCtx = useContext(ImgContext);
  const [clicks, setClicks] = useState(0);
  const [docs, setDocs] = useState(null);
  

  const closeModalHandler = (e) => {
    if (e.target.classList.contains("backdrop")) {
      props.closeModal();
    }
  };


  useEffect(() => {
    if (!db || !authCtx.currentUser || !authCtx.currentUser.uid) {
      console.error("Missing required variables:", { db, authCtx });
      return;
    }

    const unsub = onSnapshot(doc(db, "images", props.selectedObj.id), (doc) => {
      if (doc.exists()) {
        // console.log(doc.data());  // Here, we get the messages array from firebase
        doc.exists() && setDocs(doc.data());
        setClicks(doc.data().clicks);
      } else {
        console.error("Document does not exist:");
      }
    });
    return () => {
      unsub();
    };
  }, [db, authCtx.currentUser.uid]);

  console.log();

  return (
    <div className="backdrop" onClick={closeModalHandler}>
      <div className="modal">
        <img
          src={props.selectedUrl}
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
        <span>
          Image Link -{" "}
          <p>
            <a href={`${location.origin}` + `/image/${props.selectedObj.id}`} target="#">
              {`${location.origin}` + `/image/${props.selectedObj.id}`}
            </a>
          </p>
        </span>
       
        <span>
          Total Clicks On Your image Link - <span>{clicks}</span>
        </span>
        <div style={{ marginTop: "20px", width: "50%", textAlign: "center" }}>
          You can now share this image link with your friends.
        </div>
      </div>
    </div>
  );
};

export default Modal;
