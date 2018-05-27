import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();
const token = process.env.SPOTIFY_TOKEN;

const ADD_TRACK_TO_LISTEN = 'ADD_TRACK_TO_LISTEN';
const ADD_TRACK_TO_LISTENED = 'ADD_TRACK_TO_LISTENED';
const DELETE_TRACK = 'DELETE_TRACK';

const toListenTracksReducer = (toListenTracks = [], action) => {
  switch (action.type) {
    case ADD_TRACK_TO_LISTEN:
      return [...toListenTracks, action.track];
    case DELETE_TRACK:
      return toListenTracks.filter(track => track.id !== action.track.id);
  }
  return toListenTracks;
};

const listenedTracksReducer = (listenedTracks = [], action) => {
  switch (action.type) {
    case ADD_TRACK_TO_LISTENED:
      return [...listenedTracks, action.track];
  }
  return listenedTracks;
};

const reducer = combineReducers({
  toListenTracks: toListenTracksReducer,
  listenedTracks: listenedTracksReducer
});

const setToken = () => {
  if (token) {
    spotify.setAccessToken(token);
  }
};

const addTrackToListen = (track) => {
  return (dispatch) => {
    return dispatch({ type: ADD_TRACK_TO_LISTEN, track });
  };
};

const addTrackToListened = (track) => {
  return (dispatch) => {
    return dispatch({ type: ADD_TRACK_TO_LISTENED, track });
  };
};

const deleteTrack = (track) => {
  return (dispatch) => {
    return dispatch({ type: DELETE_TRACK, track });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { spotify, setToken, addTrackToListen, addTrackToListened, deleteTrack };
