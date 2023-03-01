import axios from '../axios'
import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'
import Nav from "../Nav/Nav"
import {
    useParams,
  } from "react-router-dom";

export default function ProjectDetail(props) {
  const [response, setResponse] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);
  
  let {id} = useParams();
  console.log(id)

  var sampleproject = [];

  async function getSampleProject() {
    await axios.get('/api/Projects/'+id, {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
        sampleproject = 
        <div class="border p-3 mt-5" style={{ borderRadius: "18px" }}>
        <div className='d-flex justify-content-around'>
        <div class='card text-center mb-3'>
        <h3 class="card-header">{res.data.name}</h3>
        <div class="card-body">
          <h6 class="card-subtitle text-muted">Created By: {res.data.creator}</h6>
        </div>
        <div className="rounded mx-auto d-block p-2 border">
        <img width="100vh" src="https://user-images.githubusercontent.com/76911582/196771457-2c0b15c0-bb27-4f73-a1b6-2120f2dfbca4.png" />
        </div>
        <div class="card-body">
        <ReactMarkdown children={res.data.description}/>
        </div>
        <div class="card-body">
          <a href="#like" class="card-link">Like</a>
          <a href="#report" class="card-link">Report</a>
        </div>
        <div class="card-footer text-muted">
          <b>Likes:</b> {res.data.likes}
          &nbsp;&nbsp;
            <b>Project Id:</b> {res.data.id}
        </div>
      </div>
      </div>
      </div>
      setResponse(sampleproject);
      console.log(res.data)
      setloader();
    });
  }

  useEffect(() => {
    getSampleProject();
  }, []);

  return (
    <>
    <Nav/>
      <div class="p-1">
        {loader}
        {response}
      </div>
    </>
  )
}