
import api, {serverUrl} from "../axios/api";

const SET_ADMINS = 'SET_ADMINS'
const clearProfile = 'CLEAR_PROFILE'

const initialState = {
    admins: [],
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMINS:
            return {
                ...state,
                admins: action.admins
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

export const setAdmins = (admins) => ({type: SET_ADMINS, admins})

export const registerAdmin = (password, fullName, email, role) => async (dispatch) => {
    const response = await api.post(`${serverUrl}/admin/register`, {
        password: password,
        fullName: fullName,
        email: email,
        role: role
    }, {withCredentials: true})
    return response.data
}

export const getAdmins = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getAdmins`, {

    }, {withCredentials: true})
    dispatch(setAdmins(response.data))
    return response.data
}

export const getDealers = () => async (dispatch) => {
    const response = await api.get(`${serverUrl}/admin/getDealers`, {

    }, {withCredentials: true})
    return response.data
}

export const deleteAdmin = (id) => async (dispatch) => {
    const response = await api.delete(`${serverUrl}/admin/deleteAdmin/${id}`, {withCredentials: true})
}
