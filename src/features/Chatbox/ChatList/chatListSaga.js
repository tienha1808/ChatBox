import axios from "axios";
import { all, call, delay, put, takeLatest, takeLeading } from "redux-saga/effects";
import { fetchApiChatBox, fetchApiUserChatBoxes } from "../../../app/fetchApi";
import { createNewGroup, delGroup, errorApi, getChatList, leaveGroup } from "./chatListSlice";

const postApiNewGroup = async ({userId, newGroupName, friendId}) => {
    if (friendId) {
        try {
            await axios.post('/api/chatboxes', {
                name: newGroupName,
                userIds: [userId, friendId],
            })
        } catch (err) {
            return err
        }
    } else {
        try {
            await axios.post('/api/chatboxes', {
                name: newGroupName,
                userIds: [userId],
            })
        } catch (err) {
            return err
        }
    }
}

const delApiGroup = async (id) => {
    try {
        await axios.delete(`/api/chatboxes/${id}`)
    } catch (err) {
        return err
    }
}

const editApiGroup = async ({filterIds, userId}) => {
    try {
        await axios.patch(`/api/users/${userId}`, {
            chatboxIds: filterIds
        })
    } catch (err) {
        return err
    }
}

function* handleCreate (action) {
    const { userId } = action.payload
    yield delay(300)
    try {
        yield call(postApiNewGroup, action.payload)
        const chatBoxes = yield call(fetchApiUserChatBoxes, userId)
        yield put(getChatList(chatBoxes))
    } catch (err) {
        yield put(errorApi(err))
    }
}

function* handleDel (action) {
    const { groupId, userId } = action.payload
    yield delay(300)
    try {
        yield call(delApiGroup, groupId)
        const chatBoxes = yield call(fetchApiUserChatBoxes, userId)
        yield put(getChatList(chatBoxes))
    } catch (err) {
        yield put(errorApi(err))
    }
}

function* handleLeave (action) {
    const { groupId, userId } = action.payload
    yield delay(300)
    try {
        const groups = yield call(fetchApiUserChatBoxes, userId)
        const filterGroups = groups.filter(group => group.id !== groupId)
        const filterIds = filterGroups.map(group => group.id)
        yield call(editApiGroup, {filterIds, userId})
        const chatBoxes = yield call(fetchApiUserChatBoxes, userId)
        yield put(getChatList(chatBoxes))
    } catch (err) {
        yield put(errorApi(err))
    }
}

function* watchCreateGroup () {
    yield takeLeading(createNewGroup().type, handleCreate)
}

function* watchDelGroup () {
    yield takeLatest(delGroup().type, handleDel)
}

function* watchLeaveGroup () {
    yield takeLatest(leaveGroup().type, handleLeave)
}

export default function* chatListSaga () {
    yield all([watchCreateGroup(), watchDelGroup(), watchLeaveGroup()])
}