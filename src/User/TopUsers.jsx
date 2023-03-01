import axios from '../axios'
import "../App.css"
import React, { useState, useEffect } from "react";
import TextTruncate from 'react-text-truncate';
// import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'
import UserCard from "./UserCard"

export default function TopUsers(props) {
  const [responses, setResponses] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);

  var sampleusers = [];

  async function getSampleProject() {
    await axios.get('/api/Users', {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        var hreflink = "/project/"+res.data[i].id
        var props = res.data[i]
        sampleusers[i] = <div className='col'>
        <div class='card mb-3'>
        <h3 class="card-header">{props.name}</h3>
        <div class="card-body">
          <h6 class="card-subtitle text-muted">Email: {props.email}</h6>
        </div>
        <img src="https://avatars.githubusercontent.com/u/76911582?s=400&u=e5b8cd698ee7fb315ac23049a56bb03ac4149f86&v=4" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Twitter: {props.twitter}</li>
          <li class="list-group-item">Linkedin: {props.linkedin}</li>
          <li class="list-group-item">Github: {props.github}</li>
        </ul>
        <div class="card-body">
          <a href="#like" class="card-link">Like User</a>
          <a href="#report" class="card-link">Report User</a>
        </div>
        <div class="card-footer text-muted">
          Points: {props.points}
        </div>
      </div>
      </div>
      }
      setResponses(sampleusers);
      console.log(res.data)
      console.log(responses);
      setloader();
    });
  }

  useEffect(() => {
    getSampleProject();
  }, []);

  return (
    <>
      <div class="p-1">
        <div class="border p-3 mt-5" style={{ borderRadius: "18px" }}>
          <h2 class="row pb-2">
            <div class="pb-2 d-flex justify-content-around">
              <h2 class="">Top Users !</h2>
            </div>
            <hr />
          </h2>
          {loader}
          <div class="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2 g-3">
            {responses}
          </div>
        </div>
      </div>
    </>
  )
}