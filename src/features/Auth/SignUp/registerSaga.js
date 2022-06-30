import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { isRegister, isRegisterError, isRegisterSuccess } from './registerSlice'
import axios from 'axios'
import { isLogInSuccess } from '../SignIn/logInSlice'
import { fetchApiUsers } from '../../../app/fetchApi'
import { getChatList } from '../../Chatbox/ChatList/chatListSlice'
import { getFriendList } from '../../Chatbox/Extended/FriendList/friendListSlice'

const postApiUsers = async ({name, email, phone, password}) => {
    try {
        await axios.post('/api/users', {
            name,
            email,
            phone,
            password
        })
    } catch (err) {
        return err
    }
}

function* handleRegister (action) {
    const { email, phone } = action.payload
    yield delay(300)
    try {
        const users = yield call(fetchApiUsers)
        const emailRegister = users.find(user => user.email === email)
        const phoneRegister = users.find(user => user.phone === phone)
        if (emailRegister) {
            yield put(isRegisterError('Email already exists, you can try logging in with this email'))
        } else {
            if (phoneRegister) {
                yield put(isRegisterError('Phone already exists, you can try logging in with this phone'))
            } else {
                yield call(postApiUsers, action.payload)
                const users = yield call(fetchApiUsers)
                const newUser = users.find(user => user.email === email)
                if (newUser) {
                    yield put(isLogInSuccess(newUser))
                    const newChatList = []
                    yield put(getChatList(newChatList))
                    const newFriendList = []
                    yield put(getFriendList(newFriendList))
                    yield put(isRegisterSuccess())
                }
            }
        }
    } catch (err) {
        yield put(isRegisterError(err))
    }
}

export default function* registerSaga() {
    yield takeLatest(isRegister().type, handleRegister)
}