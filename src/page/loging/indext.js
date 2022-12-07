import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Table } from "react-bootstrap";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate, useRoutes } from "react-router-dom";
import "./Login.css";

const Loging = () => {
  const navigate = useNavigate();

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
      // getuser();
      getuser();
      // snapshot.docs.forEach((doc) => {
      //   console.log([doc.data()]);
      //   // console.log("onsnapshot", doc.data());
      // });
    });
  }, []);

  function handleShow(i) {
    console.log("iddd", i.id);
    navigate(i.location, { state: { votername: i } });
    // console.log("handleShow", i);
    // setvotdetails(i);
    // setShow(true);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        {user.map((i, index) => {
          return (
            <div onClick={(e) => handleShow(i)} style={{ margin: 5 }}>
              <Card
                className="cardcss"
                style={{
                  width: "18rem",
                  height: "18rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Title>{i.location}</Card.Title>
              </Card>
            </div>
          );
        })}

        {/* <div style={{ display: "flex" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Vote</th>
              </tr>
            </thead>
            {user[1]?.votedetails?.map((v, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index}</td>
                    <td>{v.name}</td>
                    <td>{v.vote}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div> */}

        {/* <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{votdetails?.location}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {votdetails?.votedetails?.map((vote) => {
                return (
                  <div>
                    {vote.name}
                    {vote.vote}
                  </div>
                );
              })}
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
    </div>
  );
};

export default Loging;
