import { all } from "redux-saga/effects";
import chatBoxSaga from "./Box/chatBoxSaga";
import chatListSaga from "./ChatList/chatListSaga";
import friendSaga from "./Extended/FriendList/friendListSaga";


export default function* chatSaga () {
    yield all([chatListSaga(), chatBoxSaga(), friendSaga()])
}