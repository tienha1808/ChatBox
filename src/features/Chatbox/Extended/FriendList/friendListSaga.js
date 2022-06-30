import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchApiUsersUsers } from "../../../../app/fetchApi";
import { addfriend, getFriendList, unfriend } from "./friendListSlice";

const patchApiUsersUser = async ({ newFriendIds, userId }) => {
    try {
        await axios.patch(`/api/users/${userId}`, {
            userIds: newFriendIds
        })
    } catch (err) {
        console.log(err)
    }
}

function* handleUnfriend (action) {
    const { userId } = action.payload
    try {
        yield call(patchApiUsersUser, action.payload)
        const friendList = yield call(fetchApiUsersUsers, userId)
        yield put(getFriendList(friendList))
    } catch (err) {
        console.log(err)
    }
}

function* handleAddfriend (action) {
    const { userId } = action.payload
    try {
        yield call(patchApiUsersUser, action.payload)
        const friendList = yield call(fetchApiUsersUsers, userId)
        yield put(getFriendList(friendList))
    } catch (err) {
        console.log(err)
    }
}

function* watchFriend () {
    yield takeLatest(unfriend().type, handleUnfriend)
    yield takeLatest(addfriend().type, handleAddfriend)
}

export default function* friendSaga () {
    yield all([watchFriend()])
}