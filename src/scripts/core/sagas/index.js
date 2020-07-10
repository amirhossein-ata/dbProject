import { all, fork } from "redux-saga/effects";
import auth from "./auth";
import business from "./business";
import service from "./service";
import reserve from "./reserve";
import profile from "./profile";
import file from "./file";
import ticket from "./ticket";
import comment from "./comment";
import wallet from "./wallet";

export default function* root() {
  yield all([
    fork(auth),
    fork(business),
    fork(service),
    fork(reserve),
    fork(profile),
    fork(file),
    fork(ticket),
    fork(comment),
    fork(wallet),
  ]);
}
