import {
  GET_NODE,
  GET_NODES,
  NODE_LOADING,
  CLEAR_CURRENT_NODE
} from "../actions/types";

const initialState = {
  node: null,
  nodes: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NODE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NODE:
      return {
        ...state,
        node: action.payload,
        loading: false
      };
    case GET_NODES:
      return {
        ...state,
        nodes: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_NODE:
      return {
        ...state,
        node: null
      };
    default:
      return state;
  }
}
