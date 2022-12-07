import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "./Details.css";

import કોંગ્રેસ from "./કોંગ્રેસ.jpeg";
import આપ from "./આપ.jpeg";
import અન્ય from "./અન્ય.jpeg";
import ભાજપ from "./ભાજપ.jpeg";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./99714-go-live.json";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Details = (props) => {
  const Location = useLocation();
  const [votenumber, setvotenumber] = useState([]);
  const [tempData, setTempdata] = useState(Location.state.votername);
  const [votenume, setvotenume] = useState([]);
  const [Profile, setProfile] = useState({});

  const [user, setUser] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // console.log("Profile", Profile);

  const data = Location.state.votername;

  const datachart = {
    labels: votenume,
    datasets: [
      {
        label: "# of Votes",
        data: votenumber,
        backgroundColor: [
          "orange",
          "green",
          "yellow",
          "rgb(88, 50, 225)",
          "rgb(234, 64,37)",
          "rgb(194, 49, 113)",
          "blue",
          "gray",
        ],

        borderWidth: 1,
      },
    ],
  };

  const databar = {
    labels: votenume,
    datasets: [
      {
        label: "",
        data: votenumber,
        backgroundColor: [
          "orange",
          "green",
          "yellow",
          "rgb(88, 50, 225)",
          "rgb(234, 64,37)",
          "rgb(194, 49, 113)",
          "blue",
          "gray",
        ],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            // size: "100%",
            color: "#ffffff",
          },
          callback: function (value, index, ticks) {
            console.log(index);
            return votenume[value];
          },
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: "",
      },
    },
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "મતની ટકાવારી",
      },
    },
  };

  useEffect(() => {
    // const getuser = async () => {
    //   const data = await getDocs(usersCollectionRef);
    //   setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getuser();
    // const colRef = collection(db, "users");
    // //real time update
    // onSnapshot(colRef, (snapshot) => {
    //   getuser();
    //   // snapshot.docs.forEach((doc) => {
    //   //   console.log([doc.data()]);
    //   //   // console.log("onsnapshot", doc.data());
    //   // });
    // });
    // const colRef = collection(db, "users", data.id);
    //real time update
    onSnapshot(doc(db, "users", tempData.id), (snapshot) => {
      updateData(snapshot.data());
      // snapshot.docs.forEach((doc) => {
      //   console.log([doc.data()]);
      //   // console.log("onsnapshot", doc.data());
      // });
    });

    // console.log("votenumber", votenumber);
    // console.log("databar", databar);

    // const result = user.filter((word) => word.id == data.id);

    // console.log("result", result);

    updateData(tempData);
  }, []);

  const updateData = (datas) => {
    const tempnumber = [];
    const tempvotenume = [];
    const temp = JSON.parse(JSON.stringify(datas));
    const sortedData = JSON.parse(JSON.stringify(temp.votedetails.sort((a, b) => b.vote - a.vote)));
    datas.votedetails.map((i) => {
      tempnumber.push(i.vote);
      tempvotenume.push(i.name);

      return;
    });

    console.log("profile_path", sortedData);
    const obj = {
      profile_path: sortedData[0].file,
      ahead_number: sortedData[0].vote - sortedData[1].vote,
      party_name: sortedData[0].party,
      nameud: sortedData[0].name,
    }
    setProfile({...obj});
    setvotenumber(tempnumber);
    setTempdata({...temp});
    setvotenume(tempvotenume);
  };

  // console.log("Profile?.profile_path", Profile);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{tempData.location}</h1>

      <div
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Lottie
          style={{ height: 70, width: 70, textAlign: "center" }}
          animationData={groovyWalkAnimation}
          loop={true}
        />
      </div>
      <div className="main">
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card className="cardprofile" style={{ width: "18rem" }}>
            <Card.Img
              style={{
                width: "100%",
                height: "18rem",
              }}
              variant="top"
              src={Profile?.profile_path}
            />
          </Card>
        </div>

        <h2 style={{ textAlign: "center", marginTop: 30 }}>
          {Profile?.party_name}
        </h2>
        <h2 style={{ textAlign: "center" }}>{Profile?.ahead_number}</h2>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>મત થી આગળ</h2>
      </div>
      <div
        className="bar"
        // style={{ width: 900, height: 500, marginLeft: 200, marginRight: 200 }}
      >
        <Bar
          // style={{ width: 400, height: 400 }}
          options={options}
          data={databar}
        />
      </div>
      <Card className="card" style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title
            style={{ textAlign: "center" }}
          >{`${tempData.location} મતગણતરી`}</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ઉમેદવાર</th>
                <th>મેળવેલા મત</th>
                <th>પાર્ટી</th>
                <th>નિશાન</th>
              </tr>
            </thead>
            <tbody>
              {tempData.votedetails.map((vote) => {
                return (
                  <tr>
                    <td>{vote.name}</td>
                    <td>{vote.vote}</td>
                    <td>{vote.party}</td>
                    <td>
                      {vote.party === "ભાજપ" ? (
                        <img
                          src={ભાજપ}
                          style={{ width: 30, height: 30, marginLeft: 5 }}
                          alt="Logo"
                        />
                      ) : vote.party === "આપ" ? (
                        <img
                          src={આપ}
                          style={{ width: 30, height: 30, marginLeft: 5 }}
                          alt="Logo"
                        />
                      ) : vote.party === "કોંગ્રેસ" ? (
                        <img
                          src={કોંગ્રેસ}
                          style={{ width: 30, height: 30, marginLeft: 5 }}
                          alt="Logo"
                        />
                      ) : (
                        <img
                          src={અન્ય}
                          style={{ width: 30, height: 30, marginLeft: 5 }}
                          alt="Logo"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div
        className="pic"
        style={{ height: 400, width: 400, marginTop: 20, marginBottom: 20 }}
      >
        <Pie options={options1} data={datachart} />
      </div>
    </div>
  );
};

export default Details;
