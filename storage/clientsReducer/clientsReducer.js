import api, {serverUrl} from "../axios/api";
import {Router} from "next/router";
import {setError} from "../ui/UiReducer";

const SET_CLIENTS = "SET_CLIENTS"
const SET_CLIENT = "SET_CLIENT"
const SET_MINISTRA_CLIENT = "SET_MINISTRA_CLIENT"
const ADD_CLIENT = "ADD_CLIENT"
const SET_PAGE_COUNT = "SET_PAGE_COUNT"

const initialState = {
    users: [],
    currentClient: {},
    currentClientMinistra: {},
    pageCount: 1
}

export default function clientsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLIENT:
            return {
                ...state,
                currentClient: action.client
            }
        case SET_MINISTRA_CLIENT:
            return {
                ...state,
                currentClientMinistra: action.ministraClient
            }
        case SET_CLIENTS:
            return {
                ...state,
                users: action.clients
            }
        case SET_PAGE_COUNT:
            return {
                ...state,
                pageCount: action.pageCount
            }
        default:
            return state
    }
}

export const setClients = (clients) => ({type: SET_CLIENTS, clients})
export const setCurrentClient = (client) => ({type: SET_CLIENT, client})
export const setCurrentMinstraClient = (ministraClient) => ({type: SET_MINISTRA_CLIENT, ministraClient})
export const addClient = (newClient) => ({type: ADD_CLIENT, newClient})
export const setPageCount = (pageCount) => ({type: SET_PAGE_COUNT, pageCount})

export const getUsers = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getUsers`, {withCredentials: true})
    dispatch(setClients(response.data.users))
}

export const getUsersBy = (param) => async () => {
    const response = await api.get(`${serverUrl}/analytics/getChartBy?${param}`, {withCredentials: true})
    return response.data.count
}

export const getGainBy = (param) => async () => {
    const response = await api.get(`${serverUrl}/analytics/getGainBy?${param}`, {withCredentials: true})
    return response.data.count
}



const  generateRandomRange = (arrayLength , gap) => {
    if (arrayLength < gap) {
        throw new Error("Array length must be greater than or equal to the gap.");
    }

    const start = Math.floor(Math.random() * (arrayLength - gap + 1));
    const end = start + gap;

    return [start, end];
}

export const getRandomUsers = (gap) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getUsers`, {withCredentials: true})

    const [start, end] = generateRandomRange(response.data.users.length, gap);

    dispatch(setClients(response.data.users.slice(start, end)))
}

export const getUsersCount = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getUsersCount`, {withCredentials: true})
    return response.data.users

}

export const getPage = (pageSize, pageId) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getPage/?pageSize=${pageSize}&pageId=${pageId}`)
    if (response === undefined) {
        dispatch(setError({msg:"У вас недостаточно прав", status:"error"}))
    }
    if (response?.data != null) {
        dispatch(setPageCount(response.data.lenght))
        dispatch(setClients(response.data.page))
    }
}

export const getPageBy = (pageSize, pageId, filters) => async (dispatch) => {

    const response = await api.get(`${serverUrl}/admin/getPageBy/?pageSize=${pageSize}&pageId=${pageId}&${filters}`)
    if (response === undefined) {
        dispatch(setError({msg:"У вас недостаточно прав", status:"error"}))
    }
    if (response?.data != null) {
        dispatch(setPageCount(response.data.lenght))
        dispatch(setClients(response.data.page))
    }
}

export const getUser = (id) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getUser/${id}`, {withCredentials: true})
    if (!response.data) {
        Router.push('/auth/login')
    }

    const userMinistra = response.data.user;
    // Convert date strings to Date objects
    if (userMinistra && userMinistra.ministraDate) {
        userMinistra.ministraDate = new Date(userMinistra.ministraDate);
    }

    if (userMinistra && userMinistra.signDate) {
        userMinistra.signDate = new Date(userMinistra.signDate);
    }

    if (userMinistra && userMinistra.trialExpirationDate) {
        userMinistra.trialExpirationDate = new Date(userMinistra.trialExpirationDate);
    }

    dispatch(setCurrentMinstraClient(JSON.parse(response.data.clientMinistra)))
    dispatch(setCurrentClient(response.data.user))
}
export const createClient = (password, fullName, email, phone, address) => async (dispatch) => {
    const response = await api.post(`${serverUrl}/admin/createClient`, {
        password: password,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address
    }, {withCredentials: true})

    return response.data.user
}

export const sendMails = ({emailArray, title, paragraph}) => async (dispatch) => {

    const response = await api.post(`${serverUrl}/admin/sendTestEmail`, {
        emails: emailArray,
        title: title,
        paragraph: paragraph,
    }, {withCredentials: true})

}

export const getAllActivatedEmails = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getUsersBy?activated`, {withCredentials: true})
    return response
}


export const deleteClient = (id) => async (dispatch) => {
    const response = await api.delete(`${serverUrl}/admin/deleteClient/${id}`, {withCredentials: true})
}
export const findUsersRegex = (searchQuery, pageId) => async (dispatch) => {
    const regex = searchQuery.split(' ').join('+').toLowerCase()
    const response = await api.get(`${serverUrl}/admin/findClient/?pageSize=1&pageId=${pageId}&regex=${regex}`)
    dispatch(setClients(response.data.users))
}

export const cancelsub = (id) => async (dispatch) => {
    const response = await api.delete(`${serverUrl}/admin/cancelMobileSub/${id}`, {withCredentials: true})
}
export const cancelMinistraSub = (id) => async (dispatch) => {
    const response = await api.delete(`${serverUrl}/admin/cancelSub/${id}`, {withCredentials:true})
}

export const createTestSub = (id, time) => async (dispatch) => {
    const response = await api.post(`${serverUrl}/admin/createTestSub/${id}`, {
        time: time
    }, {withCredentials:true})
}

export const updateMongo = (id) => async (dispatch) => {
    const response = await api.get(`${serverUrl}/analytics/updateTypesMongo`, {withCredentials:true})
}