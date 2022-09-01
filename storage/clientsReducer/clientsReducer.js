import api from "../axios/api";

const SET_CLIENTS = "SET_CLIENTS"
const SET_CLIENT = "SET_CLIENT"
const SET_MINISTRA_CLIENT = "SET_MINISTRA_CLIENT"

const initialState = {
    users:[],
    currentClient: {},
    currentClientMinistra:{}
}

export default function clientsReducer(state = initialState,action) {
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
                users:action.clients
            }
        default:
            return state
    }
}

export const setClients = (clients) => ({type:SET_CLIENTS, clients})
export const setCurrentClient = (client) => ({type:SET_CLIENT, client})
export const setCurrentMinstraClient = (ministraClient) => ({type:SET_MINISTRA_CLIENT,ministraClient})

export const getUsers = () => async (dispatch) => {
    console.log(process.env.server)
    const response = await api.get("http://localhost:8000/admin/getUsers",{withCredentials:true})
    dispatch(setClients(response.data.users))
}

export const getUser = (id) => async (dispatch) => {
    const response = await api.get(`http://localhost:8000/admin/getUser/${id}`,{withCredentials:true})

    console.log(JSON.parse(response.data.clientMinistra))
    dispatch(setCurrentMinstraClient(JSON.parse(response.data.clientMinistra)))
    dispatch(setCurrentClient(response.data.user))
}