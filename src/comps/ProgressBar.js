import React, { useEffect, useState , useContext } from 'react'
import {motion} from 'framer-motion'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage , db} from '../firebase';
import AuthContext from '../Context/AuthContext';
import { v4 as uuid } from "uuid";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  setDoc
} from "firebase/firestore";


const ProgressBar = ({file, setFile}) => {
  const authCtx = useContext(AuthContext)
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(null)
  
  useEffect(()=>{
    const storageRef = ref(storage, file.name);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
// null,
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(progress)
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error.message);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      let parts = downloadURL.split("media&token=");
      let id=parts[1];
      console.log(id);
      await setDoc(doc(db, "images", id), {
        imageId: id,
        imageUrl: downloadURL,
        senderId: authCtx.currentUser.uid,
        clicks: 0
      });
      setUrl(downloadURL)
    });
  }
);

  },[file, authCtx.currentUser.uid])


  useEffect(()=>{  // we need to remove the progress bar after file is completely uploaded(i.e., after we get url of image)
    if(url){
      setFile(null)
    }

  },[url, setFile]) 
  console.log(progress, url);
  return (
    <motion.div className='progress-bar' initial={{width: 0}} animate={{width: progress + '%'}}></motion.div>
  )
}

export default ProgressBar