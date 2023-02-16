
const SET_ERROR = "SET_ERROR"

const initialState = {
    errorStatus:"success",
    errorMsg:"Welcome !"
}

export default function UiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR:
            console.log(action.error)
            return {...state, errorMsg:action.error.msg, errorStatus: action.error.status}
        default:
            return state
    }
}

export const setError = (error) => ({type:SET_ERROR, error:error})