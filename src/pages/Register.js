import React, { useState } from "react";
// import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      setIsLoading(true)
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      if (!displayName) {
        console.error("Invalid displayName:", displayName);
        setError(true);
        return;
      }

      const storageRef = ref(storage, displayName); // if the userName is John , it's going to be John.png in firebase

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         null,
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          setError(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
              chat: [{}],
            });
            await setDoc(doc(db, "users", res.user.uid), {
              // the collection's name is "users" and we are going to use this collection to store all users 
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL,
            }); // we added the user's uniques id becasue fetching the user becomes easy, we just have to do user.uid
            // await setDoc(doc(db, "images", res.user.uid), { images: [] });

            setIsLoading(false)
            navigate("/");
          });
        }
      );
      
    } catch (error) {
      console.log(error.message);
      setError(true);
    }


  };
  return (
    <div className="theme">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Social Photo Manager</span>
          <span className="title">Register</span>
          <form className="authForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src="" alt="" />
              <span>Add an image</span>
            </label>
            <button>Sign up</button>
            {error && <span>Something went wrong.</span>}
          </form>
          <p>
            Do you already have an account?<Link to="/login">Login</Link>{" "}
          </p>
          {loading && <h2 >Please wait...</h2>}
        </div>
      </div>
    </div>
  );
};

export default Register;
