import { all } from 'redux-saga/effects'
import logInSaga from './SignIn/logInSaga'
import registerSaga from './SignUp/registerSaga'

export default function* authSaga() {
    yield all([registerSaga(), logInSaga()])
}