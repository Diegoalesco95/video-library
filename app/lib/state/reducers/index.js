import {
  LOADING,
  SET_FAVORITE,
  DELETE_FAVORITE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  GET_VIDEO_SOURCE,
  GET_USER_LIST,
} from '../types/index';

export default (state, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      if (state.myList.filter((element) => element._id === action.payload._id).length !== 0) {
        return state;
      }
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        myList: state.myList.filter((items) => items._id !== action.payload.movieId),
        userList: state.userList.filter((items) => items._id !== action.payload._id),
      };
    case GET_USER_LIST:
      return {
        ...state,
        userList: [...state.userList, action.payload[0]],
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case GET_VIDEO_SOURCE:
      return {
        ...state,
        playing:
          state.trends.find((item) => item._id === action.payload) || state.originals.find((item) => item._id === action.payload) || [],
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
