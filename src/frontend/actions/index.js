import axios from 'axios';
import { SET_FAVORITE, DELETE_FAVORITE, LOGIN_REQUEST, LOGOUT_REQUEST, SET_ERROR, SIGNUP_REQUEST, GET_VIDEO_SOURCE } from '../types/index';

export const setFavorite = (payload) => ({
  type: SET_FAVORITE,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: DELETE_FAVORITE,
  payload,
});

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const logoutRequest = (payload) => ({
  type: LOGOUT_REQUEST,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const signUpRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const getVideoSource = (payload) => ({
  type: GET_VIDEO_SOURCE,
  payload,
});

export const signUpUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(signUpRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.email}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `id=${data.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const setFavoriteUserMovie = (payload) => {
  const { _id: movieId } = payload;
  return (dispatch) => {
    axios({
      url: '/user-movies',
      method: 'post',
      data: { movieId },
    })
      .then(() => {
        dispatch(setFavorite(payload));
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const deleteFavoriteUserMovie = (payload) => {
  const { _id: userMovieId } = payload;

  return (dispatch) => {
    axios({
      url: `/user-movies/${userMovieId}`,
      method: 'delete',
    })
      .then(() => {
        dispatch(deleteFavorite(payload));
      })
      .catch((error) => dispatch(setError(error)));
  };
};
