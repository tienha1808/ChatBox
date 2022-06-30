import { createSlice } from "@reduxjs/toolkit";


export const signSlice = createSlice({
    name: 'sign',
    initialState: {
        sign: false
    },
    reducers: {
        signIn (state) {
            state.sign = true
        },
        signUp (state) {
            state.sign = false
        }
    }
})

export const { signIn, signUp } = signSlice.actions

export const signSelector = state => state.sign.sign

export const signReducer = signSlice.reducer