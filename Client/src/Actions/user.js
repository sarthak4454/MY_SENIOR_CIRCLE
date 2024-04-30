import { AUTH, FETCH_ALL, CREATE, FETCHSINGLE_POST, FETCH_BY_SEARCH, DELETE_POST, LIKE_POST, GET_USER, COMMENT_POST, START_LOADING, END_LOADING, UPDATE_MESSAGE } from "../constants/actionTypes";
import * as api from "../api/index";

function timer(dispatch) {
    setTimeout(() => {
        dispatch({ type: UPDATE_MESSAGE, payload: "" });
    }, 1500);
}

export const updateMsg = (msg) => async (dispatch) => {
    dispatch({ type: UPDATE_MESSAGE, payload: msg });
    timer(dispatch);
}
export const signin = (form, navigator) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const data = await api.signIn(form);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        navigator("/");
    } catch (error) {
        const msg = error.response.data.message;
        dispatch({ type: END_LOADING });
        dispatch(updateMsg(msg));
    }
};
export const signup = (form, navigator) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const data = await api.signUp(form);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        navigator("/");
    } catch (error) {
        const msg = error.response.data.message;
        dispatch({ type: END_LOADING });
        dispatch(updateMsg(msg));
    }
};
export const googleauth = (form, navigator) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const data = await api.GoogleAuth(form);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        navigator("/");
    } catch (error) {
        dispatch({ type: END_LOADING });
        console.log(error);
    }
}
export const updateuser = (form) => async (dispatch) => {
    try {
        const data = await api.UpdateUser(form);
        dispatch({ type: AUTH, data });
        dispatch({ type: UPDATE_MESSAGE, payload: data.data.message });
        timer(dispatch);
    } catch (error) {
        console.log(error);
    }
}
export const getuser = (id) => async (dispatch) => {
    try {
        const user = await api.GetUser(id);
        await dispatch({ type: GET_USER, payload: user.data });
    } catch (error) {
        console.log(error);
    }
}
export const addblog = (form, navigator) => async (dispatch) => {
    try {
        const blog = await api.addBlog(form);
        dispatch({ type: CREATE, payload: blog.data });
        navigator("/");
    } catch (error) {
        console.log(error);
    }
}
export const fetchblogs = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const blogs = await api.fetchBlogs();
        dispatch({ type: FETCH_ALL, payload: blogs.data });
        dispatch({ type: FETCH_BY_SEARCH, payload: blogs.data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
export const fetchblogbyid = (id) => async (dispatch) => {
    try {
        const blog = await api.fetchBlogById(id);
        await dispatch({ type: FETCHSINGLE_POST, payload: blog.data });
    } catch (error) {
        console.log(error);
    }
}
export const fetchbysearch = (query) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const blog = await api.fetchBlogBySearch(query);
        dispatch({ type: FETCH_BY_SEARCH, payload: blog.data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
export const deletepost = (id, navigator) => async (dispatch) => {
    try {
        await api.DeletePost(id);
        dispatch({ type: DELETE_POST, payload: id });
        navigator("/blogs");
    } catch (error) {
        console.log(error);
    }
}
export const likepost = (id) => async (dispatch) => {
    try {
        console.log(id);
        const post = await api.LikePost(id);
        console.log(post);
        dispatch({ type: LIKE_POST, payload: post.data });
    } catch (error) {
        console.log(error);
    }
}
export const commentpost = (id, form) => async (dispatch) => {
    try {
        const post = await api.CommentPost(id, form);
        dispatch({ type: COMMENT_POST, payload: post.data });
    } catch (error) {
        console.log(error);
    }
}