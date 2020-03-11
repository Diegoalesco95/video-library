import {
  SET_FAVORITE,
  DELETE_FAVORITE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
} from '../types/index';

export default (state, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      if (
        state.myList.filter((element) => element.id === action.payload.id)
          .length !== 0
      ) {
        return state;
      }
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
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
    default:
      return state;
  }
};
