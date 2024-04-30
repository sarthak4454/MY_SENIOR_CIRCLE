import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchblogbyid, getuser } from "../Actions/user";

function BlogBox(props) {
  const content = props.item?.content?.substr(0, 204);
  const path = "/blogs/read?user=" + props.item.user + "&&blog=" + props.item._id;
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const RedirectToBlog = () => {
    dispatch(fetchblogbyid(props.item._id));
    dispatch(getuser(props.item.user));
    navigator(path);
  }
  return (<div>
    <div className="justify-around">
      <div className="Blog_title">{props.item.title}</div>
    </div>
    <div className="justify-around">
      <div className="blog_box">
        <img src={props.item.blogphoto} className="blogimg_style" alt="blogImage" />
        <div className="Blog_content">{content}... <div className="readMore" onClick={() => RedirectToBlog()}>Read More</div></div>
      </div>
    </div>
  </div>);
}
export default BlogBox;