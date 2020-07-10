import { combineReducers } from "redux";
import auth from "./auth";
import business from "./business";
import reserve from "./reserve";
import service from "./service";
import profile from "./profile";
import file from "./file";
import ticket from "./ticket";
import comment from "./comment";
import wallet from "./wallet";

export default combineReducers({
  auth,
  business,
  reserve,
  service,
  profile,
  file,
  ticket,
  comment,
  wallet,
});
