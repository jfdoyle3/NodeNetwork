import axios from "axios";

import {
  GET_NODE,
  GET_NODES,
  NODE_LOADING,
  CLEAR_CURRENT_NODE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get Current Node
export const getCurrentNode = () => dispatch => {
  dispatch(setNodeLoading());
  axios
    .get("/api/node")
    .then(res =>
      dispatch({
        type: GET_NODE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NODE,
        payload: {}
      })
    );
};
// Get Node By Handle
export const getNodeByHandle = handle => dispatch => {
  dispatch(setNodeLoading());
  axios
    .get(`/api/node/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_NODE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NODE,
        payload: null
      })
    );
};

// Create Node
export const createNode = (nodeData, history) => dispatch => {
  axios
    .post("/api/node", nodeData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/node/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("api/node/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/node/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_NODE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`api/node/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_NODE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get all Nodes
export const getNodes = () => dispatch => {
  dispatch(setNodeLoading());
  axios
    .get("api/node/all")
    .then(res =>
      dispatch({
        type: GET_NODES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NODES,
        payload: null
      })
    );
};

// Delete account and Node
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can't be undone")) {
    axios
      .delete("/api/node")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Node Loading
export const setNodeLoading = () => {
  return {
    type: NODE_LOADING
  };
};
// Clear node
export const clearCurrentNode = () => {
  return {
    type: CLEAR_CURRENT_NODE
  };
};
