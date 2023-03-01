import axios from 'axios'
import React, { useState, useEffect } from "react";
import Loader from '../Loader'

export default function HomePageProject(props) {
  const [responses, setResponses] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);

  var sampleproject = [];

  async function getSampleProject() {
    await axios.get('https://localhost:7064/api/Projects').then((res) => {
      console.log(res);

      setResponses("sampleproject");
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
              <h2 class="">Recent Projects !</h2>
            </div>
            <hr />
          </h2>
          {loader}
          <div class="row row-cols-1 row-cols-md-4 row-cols-lg-5 row-cols-sm-2 g-3">
            {responses}
          </div>
        </div>
      </div>
    </>
  )
}