import React from 'react';
import {motion} from 'framer-motion'

const Modal = (props) => {
  const closeModalHandler = (e)=>{
    if(e.target.classList.contains('backdrop')){
    props.closeModal();
    }
  }
  
  return (
    <div className='backdrop' onClick={closeModalHandler} >
      <motion.img src={props.selectedUrl} initial={{y: '-100vh'}} animate={{y:0}}/>
    </div>
  )
}

export default Modal