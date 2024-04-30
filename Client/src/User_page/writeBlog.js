import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addblog } from "../Actions/user";
import FileBase from "react-file-base64";
import "./userPage.css";

function WriteBlog() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formFormat = {
        title: "",
        content: "",
        posted: new Date().toDateString(),
        user: user?.data?.result?._id,
        blogphoto: "",
        like: [],
        comments: []
    }
    const [form, setform] = useState(formFormat);

    function updateForm(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    function postBlog() {
        if (form.title === "") {
            alert("Title can't be empty !");
            return;
        }
        if (form.content === "") {
            alert("Description can't be empty !");
            return;
        }
        if (form.blogphoto === "") {
            alert("Please upload a photo related to the blog !");
            return;
        }
        dispatch(addblog(form, navigate));
    }
    return (<div className="justifyAround">
        <div>
            <div className="writeHead">Write a Blog...</div>
            <input required name="title" onChange={updateForm} className="writeTitle" type="text" placeholder="Title*"></input>
            <br />
            <textarea required name="content" onChange={updateForm} className="writeContent" type="text" placeholder="Description*" />
            <br />
            <div>
                <div className="fileinput1">
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setform({ ...form, blogphoto: base64 })} />
                </div>
                <div className="blogbuttonGroup">
                    <button className="button_cancel" onClick={() => navigate("/")}>Cancel</button>
                    <button className="button_post" onClick={postBlog}>Post</button>
                </div>
            </div>
        </div>
    </div>);
}
export default WriteBlog;