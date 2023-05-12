import { useEffect, useState } from 'react'
import {projectStorage , projectFirestore , timestamp} from '../firebase/config'

const useStorage = (file)=>{
  // console.log(file);
  const [progress , setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url,setUrl] = useState(null);

  useEffect(()=>{
    console.log('useEffect ran...');
    console.log(file);
    //references
    const storageRef =  projectStorage.ref(file.name) // get a reference as to where the file should be saved in storage
    const collectionRef = projectFirestore.collection('images'); // collection by the name 'images' is created

    // Now to upload files to this reference location
    storageRef.put(file).on('state_changed' , (snap)=>{
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err)=>{    // this fires if error
      setError(err)
    } , async()=>{     // this function fires when upload is completed
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      collectionRef.add({url, createdAt});
      setUrl(url);
    }) // .put() is an asynchronous function therefore we add a listener 'state_changed' here and a call back function which fires once it is completed
  },[]);
  
  return {progress , url , error}
}
export default useStorage