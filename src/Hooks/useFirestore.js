// to retreive the images from the firestore collection

import React, { useEffect, useState } from 'react'
import { projectFirestore, projectStorage } from '../firebase/config'

const useFirestore = (collection) => {
  const [docs , setDocs] = useState([])

  useEffect(()=>{
    const unsub = projectFirestore.collection(collection).orderBy('createdAt', 'desc').onSnapshot((snap)=>{ // this event fires once in start and then every time the collection changes i.e., new image/doc is added in the collection
    let documents = [];
    snap.forEach((doc)=>{
      documents.push({...doc.data() , id: doc.id})
    })
     setDocs(documents)
    });

    return ()=> unsub();  // cleanup function, this runs when the collection is no longer in use i.e, when we unmount the imageGrid component(means we don't show the image grid component)
  },[collection])

  return {docs}
}

export default useFirestore