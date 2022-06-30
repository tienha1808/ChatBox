import { all } from 'redux-saga/effects'
import authSaga from '../features/Auth/authSaga'
import chatSaga from '../features/Chatbox/chatSaga'

export default function* mySaga () {
    yield all([authSaga(), chatSaga()])
}

