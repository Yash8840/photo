import React, { useEffect, useState , useContext} from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import AuthContext from "../Context/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  collection
} from "firebase/firestore";

const ImageGrid = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const clickHandler = (obj) => {
    props.selected(obj);
  };
  const [docs, setDocs] = useState(null);
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!db || !authCtx.currentUser || !authCtx.currentUser.uid) {
      console.error("Missing required variables:", { db, authCtx });
      return;
    }
    setIsLoading(true)
    const collectionRef = collection(db, "images");

// Listen for changes to the collection
const unsub = onSnapshot(collectionRef, (querySnapshot) => {
  
  // Map the query snapshot to an array of image data objects
  let imageData = querySnapshot.docs.map((doc) => doc.data());

  // Set the image data in the state

  // we filter the images for a particular user by checking the senderId of the image in firebase and the current user's id and if they match, image is shown to the user
  imageData = imageData.filter((item)=>{
    return item.senderId === authCtx.currentUser.uid
  });
  setDocs(imageData);
  setIsLoading(false)
});

    return () => {
      unsub();
    };
  }, [db, authCtx.currentUser.uid]);

  return (<>
    {loading && <h1>Loading...</h1>}
    {!loading && <div className="img-grid">
      {docs &&
        docs.map((doc) => {
          return (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={clickHandler.bind(null, {img:doc.imageUrl, id:doc.imageId, clicks: doc})}>
              <motion.img
                src={doc.imageUrl}
                alt="uploaded-img"
                initial={{ opacity: 0.8 }}
                animate={{opacity: 1}}
                transition={{delay:1}}
              />
            </motion.div>
          );
        })}
    </div>}
    </>
  );
};

export default ImageGrid;
