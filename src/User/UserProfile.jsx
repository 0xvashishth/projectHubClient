import axios from '../axios'
import "../App.css"
import React, { useState, useEffect } from "react";
import TextTruncate from 'react-text-truncate';
// import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'
import Nav from "../Nav/Nav"
import { useParams } from "react-router-dom";

export default function UserProfile(props) {
  const [responses, setResponses] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);

  var sampleusers = [];
  let { userid } = useParams();

  const [editButton, seteditButton] = useState(userid == localStorage.getItem("id") ? <button className='btn btn-info'>Edit Profile</button> : "");

  async function getSampleProject() {
    console.log("Hello World")
    
    await axios.get(`/api/Users/${userid}`, {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
        var props = res.data
        sampleusers = <div className='d-flex justify-content-around'>
        <div className='card  mb-3'>
        <h3 className="card-header text-center">{props.name}</h3>
        <div className="card-body">
          <h6 className="card-subtitle text-muted">Email: {props.email}</h6>
        </div>
        <div className="rounded mx-auto d-block p-2 border">
        <img width="100vh" src="https://user-images.githubusercontent.com/76911582/196771457-2c0b15c0-bb27-4f73-a1b6-2120f2dfbca4.png" />
        </div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Twitter: {props.twitter}</li>
          <li className="list-group-item">Linkedin: {props.linkedin}</li>
          <li className="list-group-item">Github: {props.github}</li>
        </ul>
        <div className="card-body">
          <a href="#like" className="card-link">Like User</a>
          <a href="#report" className="card-link">Report User</a>
        </div>
        <div className="card-footer text-muted">
          Points: {props.points}
        </div>
      </div>
      </div>
      setResponses(sampleusers);
      console.log(res.data)
      console.log(responses);
      setloader();
    }).catch(e=>{
        setResponses(<div className='m-auto'>User Not Found</div>);
        setloader();
    });
  }

  useEffect(() => {
    getSampleProject();
  }, []);

  return (
    <>
    <Nav/>
        <div className="border p-3 mt-2" style={{ borderRadius: "18px" }}>
          <h2 className="row pb-2">
            <div className="pb-2 d-flex justify-content-around">
              <h2 className="">User Profile</h2>
            </div>
            <hr />
          </h2>
          {loader}
        {responses}
        </div>
        <div className='mt-3 d-flex justify-content-around'>
            {editButton}
        </div>
    </>
  )
}