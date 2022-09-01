import * as axios from 'axios'
import api from "../axios/api";

const SET_USER = 'SET_USER'

const initialState = {
    login:'',
    fullName:''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                login:action.user.login,
                fullName: action.user.fullName
            }
        default:
            return state
    }
}

export const setUser = (user) => ({type:SET_USER, user})

export const loginThunk = (login, password) => async (dispatch) => {
    const response = await axios.post(`http://localhost:8000/admin/login`,{
        login:login,
        password:password,
    }, {withCredentials:true})
    localStorage.setItem('token', response.data.adminData.accessToken)
    dispatch(setUser(response.data.adminData.admin))
}
