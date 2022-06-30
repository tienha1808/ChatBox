import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        registerState: ''
    },
    reducers: {
        isRegister (state) {
            state.registerState = 'loading'
        },
        isRegisterSuccess (state) {
            state.registerState = 'success'
        },
        isRegisterError (state, action) {
            state.registerState = action.payload
        }
    }
})

export const { isRegister, isRegisterSuccess, isRegisterError } = registerSlice.actions

export const registerState = state => state.register.registerState

export const registerReducer = registerSlice.reducer