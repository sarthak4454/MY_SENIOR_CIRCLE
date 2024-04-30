import { FETCH_ALL, CREATE, FETCHSINGLE_POST, DELETE_POST, LIKE_POST, GET_USER, COMMENT_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, UPDATE_MESSAGE } from "../constants/actionTypes";
export default (state = { posts: [], post: {}, user: {}, isLoading: true, searchPosts: [], message: "" }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, posts: action.payload };
        case FETCH_BY_SEARCH:
            return { ...state, searchPosts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case FETCHSINGLE_POST:
            return { ...state, post: action.payload };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter((item) => item._id !== action.payload) };
        case LIKE_POST:
            return { ...state, posts: state.posts?.map((item) => (item._id === action.payload._id ? action.payload : item)) };
        case COMMENT_POST:
            return { ...state, posts: state.posts?.map((item) => (item._id === action.payload._id ? action.payload : item)) };
        case GET_USER:
            return { ...state, user: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case UPDATE_MESSAGE:
            return { ...state, message: action.payload };
        default:
            return state;
    }
}