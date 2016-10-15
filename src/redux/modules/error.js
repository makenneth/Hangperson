const CLEAR_ERROR = "hangperson/error/CLEAR_ERROR";
const SET_ERROR = "hangperson/error/SET_ERROR";

export default (state = {
  message: null
}, action) => {
  switch(action.type) {
    case CLEAR_ERROR:
      return { message: null };
    case SET_ERROR:
      return { message: action.payload };
    default:
      return state;
  }

  return state;
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};