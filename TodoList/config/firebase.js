import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7eJ33M7CtuRJG9EpQGieSu_53wXlTqlI",
  authDomain: "todolist-d6219.firebaseapp.com",
  projectId: "todolist-d6219",
  storageBucket: "todolist-d6219.firebasestorage.app",
  messagingSenderId: "624395060769",
  appId: "1:624395060769:web:b3d7b15c82e11059550560",
  measurementId: "G-ECR40CNJ98",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
