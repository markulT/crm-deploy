import * as axios from 'axios'
import api, {serverUrl} from "../axios/api";
import {Router} from "next/router";

const SET_USER = 'SET_USER'
const clearProfile = 'CLEAR_PROFILE'

const initialState = {
    login:'',
    fullName:'',
    role:''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action.user.role)
            return {
                ...state,
                email:action.user.email,
                fullName: action.user.fullName,
                role:action.user.role
            }
        case clearProfile:{
            return {
                ...initialState
            }
        }
        default:
            return state
    }
}

export const setUser = (user) => ({type:SET_USER, user})

export const loginThunk = (login, password) => async (dispatch) => {
    const response = await axios.post(`${serverUrl}/admin/login`,{
        login:login,
        password:password,
    }, {withCredentials:true})
    localStorage.setItem('token', response.data.adminData.accessToken)
    dispatch(setUser(response.data.adminData.admin))
}

export const loginByToken = () => async (dispatch) => {
    const response = await api.post(`${serverUrl}/admin/loginByToken`,{withCredentials:true})
    dispatch(setUser(response.data))
}

const clearProfileAC = () => ({type:clearProfile})

export const logout = () => async (dispatch) => {
    console.log("logout")
    const response = await api.post(`${serverUrl}/admin/logout`, {withCredentials: true})
    await dispatch(clearProfileAC())
    await localStorage.clear('token')
}
