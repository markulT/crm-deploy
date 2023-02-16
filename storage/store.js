import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./authReducer/authReducer";
import clientsReducer from "./clientsReducer/clientsReducer";
import channelReducer from "./channelsReducer/channelReducer";
import UiReducer from "./ui/UiReducer";
// import rootReducer from "./reducers";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

const reducers = combineReducers({
    authReducer: authReducer,
    clientsReducer:clientsReducer,
    channelReducer:channelReducer,
    UiReducer:UiReducer
})

// creating store
export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);