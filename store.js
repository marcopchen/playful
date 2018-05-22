import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();
const token = process.env.SPOTIFY_TOKEN;

const GET_TRACKS = 'GET_TRACKS';
const ADD_TRACK = 'ADD_TRACK';
const DELETE_TRACK = 'DELETE_TRACK';

const initialState = {
  tracks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return Object.assign({}, state, { tracks: action.tracks });
    case ADD_TRACK:
      return Object.assign({}, state, { tracks: [...state.tracks, action.track] });
    case DELETE_TRACK:
      return Object.assign({}, state, { tracks: state.tracks.filter(track => track.id !== action.track.id) });
    default:
      return state;
  }
};

const setToken = () => {
  if (token) {
    spotify.setAccessToken(token);
  }
};

const addTrack = (track) => {
  return (dispatch) => {
    return dispatch({ type: ADD_TRACK, track });
  };
};

const deleteTrack = (track) => {
  return (dispatch) => {
    return dispatch({ type: DELETE_TRACK, track });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { spotify, setToken, addTrack, deleteTrack };
