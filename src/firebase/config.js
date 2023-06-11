// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import * as firebase from 'firebase/app'
// // import 'firebase/storage'
// // import 'firebase/firestore'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCKNdTSl9h6vLEmSytPZBiTC6E2-9uahSs",
//   authDomain: "firegram-3bee4.firebaseapp.com",
//   projectId: "firegram-3bee4",
//   storageBucket: "firegram-3bee4.appspot.com",
//   messagingSenderId: "166366934050",
//   appId: "1:166366934050:web:4f81603f712c347ba6467b"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp; // to get the time the collection is created at in the firestore

// export {projectFirestore , projectStorage , timestamp}