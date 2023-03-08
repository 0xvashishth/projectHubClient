import axios from "../axios";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loader from "../Loader";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { ProjectEdit, ProjectDelete } from "../Auth/API";
import { useNavigate } from "react-router-dom";

export default function ProjectDetail(props) {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [description, setdescription] = useState("");
  const [imagesurls, setimagesurls] = useState("");
  const [name, setname] = useState("");
  const [ytlink, setytlink] = useState("");
  const [visibility, setvisibility] = useState("");

  const [modalMsg, setModalMsg] = useState("");

  // const { description, imagesurls, name, ytlink, visibility } = values;

  const [loader, setloader] = useState(
    <div className="d-flex justify-content-center pb-3">
      <Loader></Loader>
    </div>
  );
  const [editButton, setEditButton] = useState("");
  const [deleteButton, setDeleteButton] = useState("");

  let { id } = useParams();
  // console.log(id);

  var sampleproject = [];

  function settingUpValues(res) {
    localStorage.setItem("projid", res.id);
    localStorage.setItem("projowner", res.creator);
    setimagesurls(res.imagesurls);
    setvisibility(res.visibility);
    setytlink(res.ytlink);
    setdescription(res.description);
    setname(res.name);
  }

  function creteProjectCard(res) {
    return (
      <div className="border p-3 mt-5" style={{ borderRadius: "18px" }}>
        <div className="d-flex justify-content-around">
          <div className="mb-3">
            <h1 className="text-center">{res.name}</h1>
            <div className="card-body">
              <h6 className="text-center card-subtitle text-muted">
                Created By: {res.creator}
              </h6>
            </div>
            <div className="text-center pt-4 pb-4 rounded mx-auto d-block p-2 border">
              <img
                width="100vh"
                src="https://user-images.githubusercontent.com/76911582/196771457-2c0b15c0-bb27-4f73-a1b6-2120f2dfbca4.png"
              />
            </div>
            <div className="">
              <ReactMarkdown children={res.description} />
            </div>
            <hr />
            <div className="text-center d-flex">
              <div className="m-auto">
                <i className="fa fa-thumbs-up"></i>
                <a href="#like" className="card-link">
                  Like
                </a>
              </div>
              <div className="m-auto">
                <i className="fa fa-thumbs-down"></i>
                <a href="#report" className="card-link">
                  Report
                </a>
              </div>
            </div>
            <div className="text-center card-footer text-muted">
              <b>Likes:</b> {res.likes}
              &nbsp;&nbsp;
              <b>Project Id:</b> {res.id}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function deleteProject() {
    console.log("Inside deleting")
    setDeleteButton(<button class="btn btn-danger m-auto" type="button" disabled>
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Deleting...
  </button>);
  console.log("Inside the button modal")
    if (window.confirm("Please Confirm if you want to delete your project")) {
      var projid = localStorage.getItem("projid");
      var projowner = localStorage.getItem("projowner");
      ProjectDelete(projid, projowner)
        .then((res) => {
          if (res.status !== 204) {
          } else {
            setDeleteButton(
              <button className="btn btn-danger m-auto">
                Project Deleted
              </button>
            );
            navigate("/projects");
          }
        })
        .catch((err) => console.log(err));
    }
    setDeleteButton(
      <button className="btn btn-danger m-auto" onClick={deleteProject}>
        Delete Project
      </button>
    );
  }

  async function getSampleProject() {
    await axios
      .get("/api/Projects/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.creator == localStorage.getItem("id")) {
          console.log("This is owner");
          setEditButton(
            <button
              className="btn btn-primary m-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit Project
            </button>
          );
          setDeleteButton(
            <button className="btn btn-danger m-auto" onClick={deleteProject}>
              Delete Project
            </button>
          );
        }
        sampleproject = creteProjectCard(res.data);
        // setprojid(res.data.id);
        setResponse(sampleproject);
        settingUpValues(res.data);
        setloader();
      });
  }

  useEffect(() => {
    getSampleProject();
  }, []);

  const handleChange = (name) => (event) => {
    // console.log(imagesurls)
    const value = event.target.value;
    if (name == "name") {
      localStorage.setItem("projname", value);
      setname(value);
    } else if (name == "description") {
      localStorage.setItem("projdescription", value);
      setdescription(value);
    } else if (name == "ytlink") {
      localStorage.setItem("projytlink", value);
      setytlink(value);
    } else if (name == "visibility") {
      localStorage.setItem("projvisibility", value);
      setvisibility(value);
    } else if (name == "imagesurls") {
      localStorage.setItem("projimagesurls", value);
      setimagesurls(value);
    }
  };

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
    var projid = localStorage.getItem("projid");
    var description = localStorage.getItem("projdescription");
    var name = localStorage.getItem("projname");
    var ytlink = localStorage.getItem("projytlink");
    var visibility = localStorage.getItem("projvisibility");
    var imagesurls = localStorage.getItem("projimagesurls");
    if (!description || !name || !ytlink || !imagesurls || !visibility) {
      console.log(projid, description, name, ytlink, imagesurls, visibility);
      setModalMsg("All fields Are Required");
    } else {
      setModalMsg("");
      ProjectEdit(projid, name, description, ytlink, imagesurls, visibility)
        .then((res) => {
          if (res.status !== 200) {
            setModalMsg(res.data);
            var projData = {
              name,
              description,
              ytlink,
              imagesurls,
              visibility,
              id: projid,
            };
            sampleproject = creteProjectCard(projData);
            setResponse(sampleproject);
          } else {
            setModalMsg(res.data);
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

  return (
    <>
      <Nav />
      <div className="p-1">
        {loader}
        {response}
        <div className="pt-4 text-center">
          {editButton}&nbsp;{deleteButton}
        </div>
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
                  Edit Project
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
                    <label htmlFor="description" className="col-form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      required
                      value={description}
                      onChange={handleChange("description")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imagesurls" className="col-form-label">
                      Images Urls
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="imagesurls"
                      required
                      value={imagesurls}
                      onChange={handleChange("imagesurls")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ytlink" className="col-form-label">
                      Youtube link:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ytlink"
                      required
                      value={ytlink}
                      onChange={handleChange("ytlink")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="visibility" className="col-form-label">
                      Project Visibility:
                    </label>
                    <select
                      className="form-control"
                      id="visibility"
                      required
                      onChange={handleChange("visibility")}
                      value={visibility}
                    >
                      <option value="public" defaultValue>
                        Public
                      </option>
                      <option value="private">Private</option>
                    </select>
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
      </div>
    </>
  );
}
