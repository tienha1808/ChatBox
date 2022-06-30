import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        isLoggedIn: undefined,
        logInState: '',
        user: undefined,
        chatList: undefined,
        updateState: '',
    },
    reducers: {
        isLogging (state) {
            state.logInState = 'loading'
        },
        isLogInSuccess (state, action) {
            state.isLoggedIn = true
            state.user = action.payload
            state.logInState = 'success'
        },
        isLogInError (state, action) {
            state.isLoggedIn = false
            state.logInState = action.payload
        },
        isLoggedOut (state) {
            state.isLoggedIn = false
            state.user = undefined
            state.logInState = undefined
            state.chatList = undefined
        },
        isUpdating (state) {
            state.updateState = 'loading'
        },
        isUpdateSuccess (state, action) {
            state.user = action.payload
            state.updateState = ''
        },
        isUpdateError (state, action) { 
            state.updateState = action.payload
        }
    }
})

export const { isLogging, isLogInSuccess, isLogInError, isLoggedOut, isUpdating, isUpdateSuccess, isUpdateError } = logInSlice.actions

export const logInState = state => state.logIn.logInState
export const userCurrent = state => state.logIn.user
export const isLoggedIn = state => state.logIn.isLoggedIn
export const updateState = state => state.logIn.updateState

export const logInReducer = logInSlice.reducer