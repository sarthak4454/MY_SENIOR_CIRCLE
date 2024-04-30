import React, { useEffect, useRef, useState } from "react";
import BlogOpinion from "./BlogOpinion";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../images/profile.jpg";
import { Col, Row } from "react-bootstrap";
import ReviewButton from "./ReviewButtons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { commentpost } from "../Actions/user";
import "./SingleBlog_style.css";

function Blog(props) {
    const { user } = useSelector((state) => state.posts);
    const { post } = useSelector((state) => state.posts);

    const [comment, setcomment] = useState(post?.comments);
    const Myname = user.firstname + " " + user.lastname;
    const myRef = useRef();
    const dispatch = useDispatch();
    const commentForm = {
        username: Myname,
        data: ""
    };

    const [mycmnt, setMycmnt] = useState(commentForm);
    useEffect(() => {
        setcomment(post?.comments);
        setMycmnt(commentForm);
    }, [user, post?.comments]);

    function handleChange(e) {
        setMycmnt({ ...mycmnt, [e.target.name]: e.target.value });
    }

    function postcomment() {
        if (mycmnt.data === "") {
            return;
        }
        dispatch(commentpost(post._id, mycmnt));
        if (comment)
            setcomment([...comment, mycmnt]);
        else setcomment([mycmnt]);
        setMycmnt(commentForm);
    }
    return (<div className="SingleBlogOuter">
        <div className="singleBlog_title">{post?.title}</div>
        <div className="singleblog_date">Published on {post.posted}</div>
        <BlogOpinion user={post?.user} postId={post?._id} myRef={myRef} winWidth={props.winWidth} />
        <div className="singleblog_content">
            {post?.content}
        </div>
        {props.winWidth <= 750 && <ReviewButton postId={post?._id} user={post?.user} myRef={myRef} />}
        <div className="outerComment">
            <div className="end_line1"></div>
            <Row className="m-0 p-0">
                <Col className="m-0 p-0 AlignRight" lg={2} md={2} sm={2} xs={2}>
                    <img src={user.photo ? user.photo : Profile} className="userPhoto" />
                </Col>
                <Col className="m-0 p-0" lg={10} md={10} sm={10} xs={10}>
                    <div className="writerName">{user.firstname + " " + user.lastname}</div>
                    <div className="writerPos">{user.Experience ? user.Experience : "A Proficient Blogger"}</div>
                </Col>
            </Row>
            <div className="end_line2"></div>
            <div className="cmnt_title" ref={myRef}>Comments</div>
            <input className="commentInput" value={mycmnt.data} name="data" onChange={(e) => handleChange(e)} placeholder={comment?.length !== 0 ? "Write a comment" : "Be the first to comment"} />
            <FontAwesomeIcon icon={faPaperPlane} size="lg" className="send_button" onClick={() => postcomment()} />
            {comment?.map((item) => (
                <div className="cmntdata">
                    <b className="usercomment">{item.username}:</b> {item.data}
                </div>
            ))}
            <div className="end_line1 end_line3"></div>
        </div>
    </div>);
}
export default Blog;