import api, {serverUrl} from "../axios/api";
import {loginByToken} from "../authReducer/authReducer";

const SET_CHANNELS = "SET_CHANNELS"
const SET_IMAGE = "SET_IMAGE"
const SET_CHANNEL = "SET_CHANNEL"

const initialState = {
    channels: [],
    image: '',
    currentChannel:{}
}

export default function channelReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHANNELS:
            return {...state, channels: action.channels}
        case SET_IMAGE:
            return {...state, image: action.image}
        case SET_CHANNEL:
            return {...state, currentChannel:action.channel}
        default:
            return state
    }
}

const setChannels = (channels) => ({type: SET_CHANNELS, channels})
const setImage = (image) => ({type: SET_IMAGE, image})
const setChannel = (channel) => ({type:SET_CHANNEL, channel})

export const getChannels = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/channelManagement/getAll`, {withCredentials: true})
    // const str = btoa(String.fromCharCode.apply(null, new Uint8Array(response.data[0].imgData.data)))
    const channelArr = response.data.map((channel) => {
        return {...channel, imgData: btoa(String.fromCharCode.apply(null, new Uint8Array(channel.imgData.data)))}
    })
    dispatch(setChannels(channelArr))
}
export const createChannel = (formData) => async (dispatch) => {
    const response = await api.post(`${serverUrl}/channelManagement/create`, formData, {withCredentials: true})
}
export const getImage = (imgpath) => async (dispatch) => {
    const response = await api.post(`${serverUrl}/channelManagement/getImage`, {imgpath: imgpath}, {
        withCredentials: true,
        responseType: "arraybuffer"
    })
    const str = btoa(String.fromCharCode.apply(null, new Uint8Array(response.data)))
    // const str = new Uint8Array(response.data)
    dispatch(setImage(str))
}
export const getSingleChannel = (id) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/channelManagement/getChannel/${id}`, {withCredentials:true})
    // const channel = {...response.data, imgData:btoa(String.fromCharCode.apply(null, new Uint8Array(response.data.imgData.data)))}
    const channel = {...response.data, imgData:response.data.imgData}
    dispatch(setChannel(channel))
}
export const updateDescription = (id, text) => async (dispatch) => {
    await api.put(`${serverUrl}/channelManagement/update`, {field:"description", id:id, value:text}, {withCredentials:true})
}
export const deleteChannel = (id) => async (dispatch) => {
    const response = await api.delete(`${serverUrl}/channelManagement/delete/${id}`, {withCredentials:true})
}
export const getPageChannels = (pageSize, pageId) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/channelManagement/getPage/?pageSize=${pageSize}&pageId=${pageId}`)
    const channelArr = response.data.page.map((channel) => {
        // return {...channel, imgData: btoa(String.fromCharCode.apply(null, new Uint8Array(channel.imgData.data)))}
        return {...channel, imgData: channel.imgData}
    })
    dispatch(setChannels(channelArr))
}
export const updateImage = (formData) => async (dispatch) => {
    const response = await api.put(`${serverUrl}/channelManagement/editImage`, formData, {withCredentials:true})
}