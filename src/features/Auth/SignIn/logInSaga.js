import { all, call, delay, fork, put, take, takeLatest } from 'redux-saga/effects'
import { isLoggedOut, isLogging, isLogInError, isLogInSuccess, isUpdateError, isUpdateSuccess, isUpdating } from './logInSlice'
import { fetchApiUserChatBoxes, fetchApiMessengersUser, fetchApiUsers, fetchApiUsersUsers, fetchApiUser } from '../../../app/fetchApi'
import { getUserMes } from '../../Chatbox/Box/chatBoxSlice'
import { getChatList } from '../../Chatbox/ChatList/chatListSlice'
import { getFriendList } from '../../Chatbox/Extended/FriendList/friendListSlice'
import axios from 'axios'

const patchApiUser = async ({ userId, avatar, name, phone, age, password }) => {
    try {
        await axios.patch(`/api/users/${userId}`, {
            name: name,
            avatar: avatar,
            phone: phone,
            age: age,
            password: password,
        })
    } catch (err) {
        return err
    }
}

function* handleLogIn ({email, password}) {
    yield delay(300)
    try {
        const users = yield call(fetchApiUsers)
        const user = users.find(user => user.email === email)
        if (user) {
            if(user.password === password) {
                yield put(isLogInSuccess(user))
                yield delay(1000)
                const chatList = yield call(fetchApiUserChatBoxes, user.id)
                yield put(getChatList(chatList))
                const userMessengers = yield call(fetchApiMessengersUser, user.id)
                yield put(getUserMes(userMessengers))
                const friendList = yield call(fetchApiUsersUsers, user.id)
                yield put(getFriendList(friendList))
            } else {
                yield put(isLogInError("Password don't match"))
            }
        } else {
            yield put(isLogInError("Sorry, we don't recognise this email address"))
        }
    } catch (err) {
        yield put(isLogInError(err))
    }   
}

function* handleUpdate (action) {
    const { userId } = action.payload
    yield delay(300)
    try {
        yield call(patchApiUser, action.payload)
        const user = yield call(fetchApiUser, userId)
        yield put(isUpdateSuccess(user))
    } catch (err) {
        yield put(isUpdateError(err))
    }
}

function* watchLogInFlow () {
    while(true) {
        const action = yield take(isLogging().type)
        yield fork(handleLogIn, action.payload)
        yield take(isLoggedOut().type)
    }
}

function* watchUpdateFlow () {
    yield takeLatest(isUpdating().type, handleUpdate)
}

export default function* logInSaga() {
    yield all([watchLogInFlow(), watchUpdateFlow()])
}
