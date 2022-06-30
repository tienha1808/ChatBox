import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddeware from 'redux-saga'
import { logInReducer } from '../features/Auth/SignIn/logInSlice'
import { registerReducer } from '../features/Auth/SignUp/registerSlice'
import { chatBoxReducer } from '../features/Chatbox/Box/chatBoxSlice'
import { chatListReducer } from '../features/Chatbox/ChatList/chatListSlice'
import { friendListReducer } from '../features/Chatbox/Extended/FriendList/friendListSlice'
import { signReducer } from '../features/Home/signSlice'
import mySaga from './saga'

const sagaMiddleware = createSagaMiddeware()

export default configureStore({
    reducer: {
        register: registerReducer,
        logIn: logInReducer,
        sign: signReducer,
        chatBox: chatBoxReducer,
        chatList: chatListReducer,
        friendList: friendListReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: true}), sagaMiddleware]
})

sagaMiddleware.run(mySaga)