import axios from "../axios";
import "../App.css";
import React, { useState, useEffect } from "react";
import TextTruncate from "react-text-truncate";
// import ReactMarkdown from 'react-markdown'
import Loader from "../Loader";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import {UserEdit} from "../Auth/API"

export default function UserProfile(props) {
  const [responses, setResponses] = useState();
  const [loader, setloader] = useState(
    <div className="d-flex justify-content-center pb-3">
      <Loader></Loader>
    </div>
  );
  const [values, setValues] = useState({
    name: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

  const [modalMsg, setModalMsg] = useState("");

  const { twitter, linkedin, name, github } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    localStorage.setItem("EditName", values.name)
    localStorage.setItem("EditTwitter", values.twitter)
    localStorage.setItem("EditLinkedin", values.linkedin)
    localStorage.setItem("EditGithub", values.github)
  };

  var sampleusers = [];
  let { userid } = useParams();

  const [editButton, seteditButton] = useState(
    userid == localStorage.getItem("id") ? (
      <button
        className="btn btn-primary m-auto"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Project
      </button>
    ) : (
      ""
    )
  );

  const handleSubmit = (event) => {
    // console.log(name)
    event.preventDefault();
    setModalBtton(
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Please wait...
      </button>
    );
    var name = localStorage.getItem("EditName")
    var twitter = localStorage.getItem("EditTwitter")
    var linkedin = localStorage.getItem("EditLinkedin")
    var github = localStorage.getItem("EditGithub")
    if (!name || !github || !linkedin || !twitter) {
      console.log("checking ", name, twitter, github,  linkedin)
      setModalMsg("All fields Are Required");
    } else {
      setModalMsg("");
      UserEdit(userid, name, twitter, linkedin, github)
        .then((res) => {
            console.log(res)
          if (res.status !== 204) {
            setModalMsg("Error occured in updating user profile");
          } else {
            setModalMsg("User profile updated, Please refresh your page..!");
          }
        })
        .catch((err) => console.log(err));
    }
    setModalBtton(
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    );
  };

  const [modalBtton, setModalBtton] = useState(
    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
      Submit
    </button>
  );

  async function getUser() {
    console.log("Hello World");

    await axios
      .get(`/api/Users/${userid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        var props = res.data;
        sampleusers = (
          <div className="d-flex justify-content-around">
            <div className="card  mb-3">
              <h3 className="card-header text-center">{props.name}</h3>
              <div className="card-body">
                <h6 className="card-subtitle text-muted">
                  Email: {props.email}
                </h6>
              </div>
              <div className="rounded mx-auto d-block p-2 border">
                <img
                  width="100vh"
                  src="https://user-images.githubusercontent.com/76911582/196771457-2c0b15c0-bb27-4f73-a1b6-2120f2dfbca4.png"
                />
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Twitter: {props.twitter}</li>
                <li className="list-group-item">Linkedin: {props.linkedin}</li>
                <li className="list-group-item">Github: {props.github}</li>
              </ul>
              <div className="card-footer text-muted">
                Points: {props.points}
              </div>
            </div>
          </div>
        );
        setResponses(sampleusers);
        console.log(res.data);
        console.log(responses);
        setloader();
      })
      .catch((e) => {
        setResponses(<div className="m-auto">User Not Found</div>);
        setloader();
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Nav />
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
      <div className="mt-3 d-flex justify-content-around">{editButton}</div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Your Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={name}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="twitter" className="col-form-label">
                    Twitter:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="twitter"
                    required
                    value={twitter}
                    onChange={handleChange("twitter")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="col-form-label">
                    Linkedin:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="linkedin"
                    required
                    value={linkedin}
                    onChange={handleChange("linkedin")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="github" className="col-form-label">
                    GitHub:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="github"
                    required
                    value={github}
                    onChange={handleChange("github")}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {modalBtton}
            </div>
            <div className="m-2">{modalMsg}</div>
          </div>
        </div>
      </div>
    </>
  );
}
