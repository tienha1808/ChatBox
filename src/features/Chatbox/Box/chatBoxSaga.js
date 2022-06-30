import axios from "axios";
import { END, eventChannel } from 'redux-saga'
import { all, call, delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchApiChatBox, fetchApiMessengersAll, fetchApiUserChatBoxes } from "../../../app/fetchApi";
import { getChatList } from "../ChatList/chatListSlice";
import { deleteMes, errorMes, getAllMes, getChatBox, getChatBoxErr, getChatBoxCurrent, sendMes, renameChatBox, addMember, kickMember, successMember } from "./chatBoxSlice";

const createMessenger = async ({ messenger, boxId, userId }) => {
    try {
        await axios.post('/api/messengers', {
            messenger: messenger,
            userId: userId,
            chatboxId: boxId,
            date: new Date().toISOString(),
        })
    } catch (err) {
        return err
    }
}

const deleteMessenger = async (messengerId) => {
    try {
        await axios.delete(`/api/messengers/${messengerId}`)
    } catch (err) {
        return err
    }
}

const patchChatbox = async ({chatboxId, newName}) => {
    try {
        await axios.patch(`/api/chatboxes/${chatboxId}`, {
            name: newName
        })
    } catch (err) {
        return err
    }
}

const patchMember = async ({chatboxId, memberIds}) => {
    try {
        await axios.patch(`/api/chatboxes/${chatboxId}`, {
            userIds: memberIds
        })
    } catch (err) {
        console.log(err)
    }
}

function* handleChatBox (action) {
    const channel = yield call(countdown, 10)
    yield takeEvery(channel, function* () {
        const { id } = action.payload
        try {
            const chatBox = yield call(fetchApiChatBox, id)
            yield put(getChatBoxCurrent(chatBox))
            const allMessengers = yield call(fetchApiMessengersAll, id)
            yield put(getAllMes(allMessengers))
        } catch (err) {
            yield put(getChatBoxErr(err))
        }
    })
}

function* handleSendMessenger (action) {
    const { boxId } = action.payload
    yield delay(300)
    try {
        yield call(createMessenger, action.payload)
        const allMessengers = yield call(fetchApiMessengersAll, boxId)
        yield put(getAllMes(allMessengers))
    } catch (err) {
        yield put(errorMes(err))
    }

}

function* handleDelMessenger (action) {
    const { messengerId, boxId } = action.payload
    yield delay(300)
    try {
        yield call(deleteMessenger, messengerId)
        const allMessengers = yield call(fetchApiMessengersAll, boxId)
        yield put(getAllMes(allMessengers))
    } catch (err) {
        yield put(errorMes(err))
    }
}

function* handleRenameChatBox (action) {
    const { chatboxId, userId } = action.payload
    yield delay(300)
    try {
        yield call(patchChatbox, action.payload)
        const chatBox = yield call(fetchApiChatBox, chatboxId)
        yield put(getChatBoxCurrent(chatBox))
        const chatList = yield call(fetchApiUserChatBoxes, userId)
        yield put(getChatList(chatList))
    } catch (err) {
        yield put(getChatBoxErr(err))
    }
}

function* handleMember (action) {
    const { chatboxId } = action.payload
    yield delay(300)
    try {
        yield call(patchMember, action.payload)
        const chatBox = yield call(fetchApiChatBox, chatboxId)
        yield put(getChatBoxCurrent(chatBox))
    } catch (err) {
        console.log(err)
    }
}

function countdown(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
          secs -= 1
          if (secs > 0) {
            emitter(secs)
          } else {
            emitter(END)
          }
        }, 3000);
        return () => {
          clearInterval(iv)
        }
      }
    )
}

function* watchMessenger () {
    yield takeLatest(deleteMes().type, handleDelMessenger)
    yield takeLatest(sendMes().type, handleSendMessenger)
    yield takeLatest(getChatBox().type, handleChatBox)
}

function* watchChatBox () {
    yield takeLatest(renameChatBox().type, handleRenameChatBox)
}

function* watchMember () {
    yield takeLatest(addMember().type, handleMember)
    yield takeLatest(kickMember().type, handleMember)
}

export default function* chatBoxSaga () {
    yield all([watchMessenger(), watchChatBox(), watchMember()])
}