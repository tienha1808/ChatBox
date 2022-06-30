import { createSlice } from "@reduxjs/toolkit";

export const chatBoxSlice = createSlice({
    name: 'chatBox',
    initialState: {
        chatBoxCurrent: undefined,
        messengers: {
            userMessengers: [],
            allMessengers: [],
            
        },
        extendedState: '',
        chatBoxState: '',
        messengerState: '',
        memberState: '',
        hiddenMes: []
    },
    reducers: {
        getChatBox (state) {
            state.chatBoxState = 'loading'
        },

        getChatBoxErr (state, action) {
            state.chatBoxState = action.payload
        },
        
        getChatBoxCurrent (state, action) {
            state.extendedState = ''
            state.memberState = ''
            state.chatBoxCurrent = action.payload
        },
        
        renameChatBox (state) {
            state.extendedState = 'loading'
        },

        // Handle Messengers User
        getUserMes (state, action) {
            state.messengers.userMessengers = action.payload
        },

        sendMes (state) {
            state.messengerState = 'loading'
        },

        errorMes (state, action) {
            state.messengerState = action.payload
        },

        pushHiddenMes (state, action) {
            state.hiddenMes.push(action.payload)
        },

        deleteMes (state) {
            state.messengerState = 'loading'
        },

        // Handle Messengers Other
        getAllMes (state, action) {
            state.messengers.allMessengers = action.payload
            state.chatBoxState = 'success'
            state.messengerState = ''
        },

        addMember (state) {
            state.memberState = 'loading'
        },

        kickMember (state) {
            state.memberState = 'loading'
        },
    }
})

export const { getChatBox, renameChatBox, addMember, kickMember, getChatBoxErr, getAllMes, getUserMes, sendMes, errorMes, pushHiddenMes, deleteMes, getChatBoxCurrent } = chatBoxSlice.actions

export const messengers = state => state.chatBox.messengers
export const chatBoxState = state => state.chatBox.chatBoxState
export const chatBoxCurrent = state => state.chatBox.chatBoxCurrent
export const messengerState = state => state.chatBox.messengerState
export const hiddenMessengersState = state => state.chatBox.hiddenMes
export const extendedState = state => state.chatBox.extendedState
export const memberState = state => state.chatBox.memberState

export const chatBoxReducer = chatBoxSlice.reducer