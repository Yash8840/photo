import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';

function App() {
  const [selected , setSelected] = useState(false);
  const [urlwa , setUrlwa] = useState("")

  const selectionHandler = (url)=>{
    setSelected(true);
    setUrlwa(url)
  }
  const closeModalHandler = ()=>{
    setSelected(false)
  }
  return (
    <div className="App">
      <Title/>
      <UploadForm/>
      <ImageGrid selected={selectionHandler} />
      {selected && <Modal selectedUrl = {urlwa} closeModal= {closeModalHandler}/>}
    </div>
  );
}

export default App;
