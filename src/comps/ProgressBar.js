import React, { useEffect } from 'react'
import useStorage from '../Hooks/useStorage'
import {motion} from 'framer-motion'


const ProgressBar = ({file, setFile}) => {
  const {progress, url} = useStorage(file);

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