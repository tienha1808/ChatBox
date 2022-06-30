import axios from "axios"

export const fetchApiUsers = async () => {
    try {
        const res = await axios.get('/api/users')
        const data = await res.data
        return data.users
    } catch (err) {
        return err
    }
}

export const fetchApiUser = async (id) => {
    try {
        const res = await axios.get(`/api/users/${id}`)
        const data = await res.data
        return data.user
    } catch (err) {
        return err
    }
}

export const fetchApiChatBox = async (id) => {
    try {
        const res = await axios.get(`/api/chatboxes/${id}`)
        const data = await res.data
        return data.chatbox
    } catch (err) {
        return err
    }
}

export const fetchApiUserChatBoxes = async (id) => {
    try {
        const res = await axios.get(`/api/users/${id}/chatboxes`)
        const data = await res.data
        return data.chatboxes
    } catch (err) {
        return err
    }
}

export const fetchApiMessengersAll = async (id) => {
    try {
        const res = await axios.get(`/api/chatboxes/${id}/messengers`)
        const data = await res.data
        return data.messengers
    } catch (err) {
        return err
    }
}

export const fetchApiMessengersUser = async (id) => {
    try {
        const res = await axios.get(`/api/users/${id}/messengers`)
        const data = await res.data
        return data.messengers
    } catch (err) {
        return err
    }
}

export const fetchApiUsersUsers = async (id) => {
    try {
        const res = await axios.get(`/api/users/${id}/users`)
        const data = await res.data
        return data.users
    } catch (err) {
        return err
    }
}
