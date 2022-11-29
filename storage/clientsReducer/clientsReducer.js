import api from "../axios/api";
import {Router} from "next/router";

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
    console.log(process.env.server)
    const response = await api.get("http://localhost:8000/admin/getUsers", {withCredentials: true})
    dispatch(setClients(response.data.users))
}
export const getPage = (pageSize, pageId) => async (dispatch) => {

    const response = await api.get(`http://localhost:8000/admin/getPage/?pageSize=${pageSize}&pageId=${pageId}`)
    dispatch(setPageCount(response.data.lenght))
    console.log(response.data)
    dispatch(setClients(response.data.page))
}

export const getUser = (id) => async (dispatch) => {
    const response = await api.get(`http://localhost:8000/admin/getUser/${id}`, {withCredentials: true})
    if(!response.data) {
        Router.push('/auth/login')
    }
    dispatch(setCurrentMinstraClient(JSON.parse(response.data.clientMinistra)))
    dispatch(setCurrentClient(response.data.user))
}
export const createClient = (login, password, fullName, email, phone, address) => async (dispatch) => {
    const response = await api.post(`http://localhost:8000/admin/createClient`, {
        login: login,
        password: password,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address
    }, {withCredentials: true})
}
export const deleteClient = (id) => async (dispatch) => {
    const response = await api.delete(`http://localhost:8000/admin/deleteClient/${id}`, {withCredentials: true})
}
export const findUsersRegex = (searchQuery, pageId) => async (dispatch) => {
    const regex = searchQuery.split(' ').join('+')
    console.log(regex)
    const response = await api.get(`http://localhost:8000/admin/findClient/?pageSize=1&pageId=${pageId}&regex=${regex}`)
    console.log(response.data.users)
    dispatch(setClients(response.data.users))
}

export const cancelsub = (id) => async (dispatch) => {
    const response = await api.delete(`http://localhost:8000/admin/cancelMobileSub/${id}`,{withCredentials:true})
    console.log(response.data)
}