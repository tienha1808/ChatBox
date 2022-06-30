import { createSlice } from "@reduxjs/toolkit";


const chatListSlice = createSlice({
    name: 'chatList',
    initialState: {
        chatList: undefined,
        stateApi: '',
    },
    reducers: {
        getChatList (state, action) {
            state.stateApi = 'success'
            state.chatList = action.payload
        },
        createNewGroup (state) {
            state.stateApi = 'loading'
        },
        delGroup (state) {
            state.stateApi = 'loading'
        },
        leaveGroup (state) {
            state.stateApi = 'loading'
        },
        errorApi (state, action) {
            state.stateApi = action.payload
        }
    }
})

export const { getChatList, createNewGroup, delGroup, leaveGroup, errorApi } = chatListSlice.actions

export const chatListState = state => state.chatList.chatList
export const stateApiChatList = state => state.chatList.stateApi

export const chatListReducer = chatListSlice.reducer