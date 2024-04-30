import React, { useState, useEffect } from "react";
import { faPenSquare, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileBase from "react-file-base64";
import { updateuser } from "../Actions/user.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../images/profile.jpg";

function MyProfile(props) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { message } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Intialform = {
    emailid: user?.data?.result?.emailid,
    firstname: user?.data?.result?.firstname,
    lastname: user?.data?.result?.lastname,
    photo: user?.data?.result?.photo,
    collegeName: user?.data?.result?.collegeName,
    Experience: user?.data?.result?.Experience,
    token: user?.data?.token
  }
  const [editProfile, setProfile] = useState(false);
  const [form, setform] = useState(Intialform);
  const profilePath = "/user/profile/";

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  return (<div className="user_sidebar" style={{ height: (props.winHeight - 57) }}>
    {editProfile && <div className="detail">
      <button className="detail_button" onClick={() => {
        setProfile(false);
        setform(Intialform);
      }}>Cancel</button>
      <button className="detail_button" onClick={() => {
        setProfile(false);
        dispatch(updateuser(form));
      }}>Save</button>
    </div>}
    {message != "" && <div className="animated fadeOut profileUpdated" style={{ animationDelay: "0.5s" }}>{message}</div>}
    <div className="usersidebar_title" style={(editProfile == true) ? { marginTop: "1px" } : {}}>{form.firstname} {form.lastname}</div>
    <img src={form.photo ? form.photo : Profile} className="usersidebar_img" />
    {!editProfile && <div>
      <div className="justifyRight">
        <button className="edit_button" onClick={() => setProfile(true)}>Edit</button>
      </div>
      <div className="usersidebar_opt">
        <div>
          <div className="option1">
            <FontAwesomeIcon icon={faBook} className="myBlog_icon" />
            &nbsp;&nbsp;&nbsp;<div className="user_options pointer" onClick={() => {
              navigate(profilePath + "myblogs");
            }}>My Blogs</div>
          </div>
          <div className="option2">
            <FontAwesomeIcon icon={faPenSquare} className="myBlog_icon" />
            &nbsp;&nbsp;&nbsp;<div className="user_options pointer FitWidth" onClick={() => {
              navigate(profilePath + "writeblog");
            }}>Write Blog</div>
          </div>
        </div>
      </div>
    </div>}
    {editProfile && <div>
      <div className="justifyRight"><div className="fileinput"><FileBase type="file" multiple={false} onDone={({ base64 }) => setform({ ...form, photo: base64 })} /></div></div>
      <input required name="collegeName" value={form.collegeName} onChange={(e) => handleChange(e)} className="writeDetails" type="text" placeholder="College name"></input>
      <textarea required name="Experience" value={form.Experience} onChange={(e) => handleChange(e)} className="writeExperience" type="text" placeholder="About Yourself" />
    </div>}
  </div>);
}
export default MyProfile;