import React, { useEffect, useState } from "react";
import useFirestore from "../Hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = (props) => {
  const clickHandler = (url) => {
    props.selected(url);
  };

  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => {
          return (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={clickHandler.bind(null, doc.url)}>
              <motion.img
                src={doc.url}
                alt="uploaded-img"
                initial={{ opacity: 0 }}
                animate={{opacity: 1}}
                transition={{delay:1}}
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
