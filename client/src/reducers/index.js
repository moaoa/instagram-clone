import * as actions from "../actions/constants";
export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || "",
  posts: [],
  userPosts: [],
};
export default function (state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case actions.USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case actions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case actions.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actions.LOG_OUT:
      return {
        ...state,
        user: null,
        token: null,
        userPosts: [],
      };
    case actions.USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case actions.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actions.UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actions.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actions.FOLLOW_USER:
      const obj = {
        ...state,
        user: {
          ...state.user,
          followings: action.payload.followings,
          followers: action.payload.followers,
        },
      };
      console.log(obj);

      return obj;

    default:
      return state;
  }
}
