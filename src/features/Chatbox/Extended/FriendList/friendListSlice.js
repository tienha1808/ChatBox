import { createSlice } from "@reduxjs/toolkit";


export const friendListSlice = createSlice({
    name: 'friendList',
    initialState: {
        friends: undefined,
        state: ''
    },
    reducers: {
        getFriendList (state, action) {
            state.state = 'success'
            state.friends = action.payload
        },
        addfriend (state) {
            state.state = 'loading'
        },
        unfriend (state) {
            state.state = 'loading'
        }
    }
})

export const { getFriendList, addfriend, unfriend } = friendListSlice.actions

export const friendList = state => state.friendList.friends
export const stateFriendList = state => state.friendList.state

export const friendListReducer = friendListSlice.reducer