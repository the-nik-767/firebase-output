import "./App.css";
import Loging from "./page/loging/indext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../src/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Details from "./page/Details/indext";

function App() {
  const [user, setUser] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getuser = async () => {
      const data = await getDocs(usersCollectionRef);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getuser();
    const colRef = collection(db, "users");
    //real time update
    onSnapshot(colRef, (snapshot) => {
      getuser();

      // snapshot.docs.forEach((doc) => {
      //   console.log([doc.data()]);
      //   // console.log("onsnapshot", doc.data());
      // });
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loging />} />
        {user.map((Items, index) => {
          return (
            <Route
              key={index}
              path={`${Items.location}`}
              element={<Details />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
