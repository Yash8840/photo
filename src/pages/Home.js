import React from 'react'
import {useState} from 'react'
import {  logEvent } from "firebase/analytics";
import { analytics } from '../firebase';
import './Home.css';
import Title from '../comps/Title'
import UploadForm from '../comps/UploadForm'
import ImageGrid from '../comps/ImageGrid'
import Modal from '../comps/Modal'

const Home = () => {
  const [selected , setSelected] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null)

  const selectionHandler = (obj)=>{
    setSelected(true);
    setSelectedObj(obj)
  }
  const closeModalHandler = ()=>{
    setSelected(false)
  }
  return (
    <div className="App">
      <Title/>
      <UploadForm/>
      <ImageGrid selected={selectionHandler} />
      {selected && <Modal selectedObj={selectedObj} selectedUrl = {selectedObj.img} closeModal= {closeModalHandler}/>}
    </div>
  );
}

export default Home