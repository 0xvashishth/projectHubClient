import React, { useState } from "react";
import {setStorageLogin,removeStorageLogin, checkUser} from "../checkStorage"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {checkCreate} from "../Auth/AuthChecking";
import { ProjectSubmit } from "../Auth/API";
import Nav from "../Nav/Nav";

export default function CreateProject(props){
  checkCreate();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    description: "",
    imagesurls: "",
    ytlink: "",
    name: "",
    loading: "",
    visibility:"",
  });

  const { description, imagesurls, name, ytlink, loading, visibility } = values;

  //   if(localStorage.getItem("Verified")){
  //     usrloggedIn = localStorage.getItem("Verified");
  //   }

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: "Loading..." });
    if(!description || !name || !ytlink || !imagesurls || !visibility){
        setValues({ ...values, loading: "All Fields Are Required..!"});
    }else{
    ProjectSubmit(name, description, ytlink, imagesurls, visibility)
      .then((res) => {
        if (res.status !== 200) {
          console.log(res)
          setValues({ ...values, loading: res.data });
        } else {
            console.log(res.data)
            // const {description, name, imagesurls, id, likes, reports, ytlink} = res.data
            navigate("/projects");
        }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <>
    <Nav/>
    <div className="m-3 p-1 border border-primary rounded">
      <div className="m-4">
        <h2>Create Project</h2>
        <hr />
        <form encType="multipart/form-data">
          <div className="m-4">
          <div class="form-group">
              <label htmlFor="name" class="form-label mt-4">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange("name")}
                class="form-control"
                id="name"
                aria-describedby="emailHelp"
                placeholder="Enter Project Name"
              />
            </div>
            <div class="form-group">
              <label htmlFor="description" class="form-label mt-4">
                Description
              </label>
              <textarea
                type="email"
                name="description"
                value={description}
                onChange={handleChange("description")}
                class="form-control"
                id="description"
                aria-describedby="emailHelp"
                placeholder="Enter Project Description"
              />
            </div>
            <div class="form-group">
              <label htmlFor="imagesurls" class="form-label mt-4">
                Images Urls
              </label>
              <input
                type="imagesurls"
                name="text"
                value={imagesurls}
                onChange={handleChange("imagesurls")}
                class="form-control"
                id="imagesurls"
                aria-describedby="emailHelp"
                placeholder="Enter Images Urls (CDNs)"
              />
                <small id="emailHelp" class="form-text text-muted">Provide online cdn links of imaages saperated by comma (,)</small>
            </div>
            
            <div class="form-group">
              <label htmlFor="ytlink" class="form-label mt-4">
              Youtube Video Link
              </label>
              <input
                type="text"
                name="ytlink"
                value={ytlink}
                onChange={handleChange("ytlink")}
                class="form-control"
                id="ytlink"
                aria-describedby="emailHelp"
                placeholder="Enter Youtube Project Video Link"
              />
            </div>
            <div class="form-group">
              <label htmlFor="visibility" class="form-label mt-4">
              Visibility
              </label>
              <select className="form-control" name="visibility" onChange={handleChange("visibility")} value={visibility}>
                <option value="public" defaultValue>Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div className="m-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-outline-success"
            >
              Create Project
            </button>
          </div>
          {loading}
        </form>
      </div>
    </div>
    </>
  );
};