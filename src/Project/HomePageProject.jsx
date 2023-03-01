import axios from 'axios'
import React, { useState, useEffect } from "react";
import TextTruncate from 'react-text-truncate';
// import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'

export default function HomePageProject(props) {
  const [responses, setResponses] = useState();
  const [topusers, settopusers] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);
  const [loader1, setloader1] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);

  var sampleproject = [];
  var topuserslist = [];

  async function getSampleProject() {
    await axios.get('https://localhost:7064/api/Projects', {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
      var len;
      if (res.data.length <= 4) {
        len = res.data.length;
      } else {
        len = 4;
      }
      for (let i = 0; i < len; i++) {
        sampleproject[i] = 
        <div className='col'>
        <div class='card mb-3'>
        <h3 class="card-header">Project: {res.data[i].id}</h3>
        <div class="card-body">
          <h5 class="card-title">{res.data[i].name}</h5>
          <h6 class="card-subtitle text-muted">Created By: {res.data[i].creator}</h6>
        </div>
        <img src="https://avatars.githubusercontent.com/u/76911582?s=400&u=e5b8cd698ee7fb315ac23049a56bb03ac4149f86&v=4" />
        <div class="card-body">
        {/* <ReactMarkdown children={}/> */}
        <TextTruncate line={2} text={res.data[i].description} className="card-text" />
        </div>
        <div class="card-body">
          <a href="#like" class="card-link">Like</a>
          <a href="#report" class="card-link">Report</a>
        </div>
        <div class="card-footer text-muted">
          Likes: {res.data[i].likes}
        </div>
      </div>
      </div>
      }
      setResponses(sampleproject);
      console.log(res.data)
      setloader();
    });
  }

  async function getTopUsers() {
    await axios.get('https://localhost:7064/api/Users', {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
      var len;
      if (res.data.length <= 4) {
        len = res.data.length;
      } else {
        len = 4;
      }
      for (let i = 0; i < len; i++) {
        topuserslist[i] = 
        <div className='col'>
        <div class='card mb-3'>
        <h3 class="card-header">Project: {res.data[i].id}</h3>
        <div class="card-body">
          <h5 class="card-title">{res.data[i].name}</h5>
          <h6 class="card-subtitle text-muted">Email: {res.data[i].email}</h6>
        </div>
        <img src="https://avatars.githubusercontent.com/u/76911582?s=400&u=e5b8cd698ee7fb315ac23049a56bb03ac4149f86&v=4" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Twitter: {res.data[i].twitter}</li>
          <li class="list-group-item">Linkedin: {res.data[i].linkedin}</li>
          <li class="list-group-item">Github: {res.data[i].github}</li>
        </ul>
        <div class="card-body">
          <a href="#like" class="card-link">Like User</a>
          <a href="#report" class="card-link">Report User</a>
        </div>
        <div class="card-footer text-muted">
          Points: {res.data[i].points}
        </div>
      </div>
      </div>
      }
      settopusers(topuserslist);
      console.log(res.data)
      setloader1();
    });
  }

  useEffect(() => {
    getSampleProject();
    getTopUsers();
  }, []);

  return (
    <>
      <div class="p-1">
        <div class="border p-3 mt-5" style={{ borderRadius: "18px" }}>
          <h2 class="row pb-2">
            <div class="pb-2 d-flex justify-content-around">
              <h2 class="">Recent Projects !</h2>
            </div>
            <hr />
          </h2>
          {loader}
          <div class="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2 g-3">
            {responses}
          </div>
        </div>
      </div>

      <br/>

      <div class="p-1">
        <div class="border p-3 mt-5" style={{ borderRadius: "18px" }}>
          <h2 class="row pb-2">
            <div class="pb-2 d-flex justify-content-around">
              <h2 class="">Top Users !</h2>
            </div>
            <hr />
          </h2>
          {loader1}
          <div class="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2 g-3">
            {topusers}
          </div>
        </div>
      </div>
    </>
  )
}