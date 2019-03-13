import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./authReducer";
import streams from "./streamsReducer";

export default combineReducers({
  auth,
  form,
  streams
});
