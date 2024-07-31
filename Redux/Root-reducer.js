import { combineReducers } from "redux"
import userReducer from "./UserReducer/Reducer"
import mapReducer from "./MapReducer/Reducer"
import modalReducer from "./ModalReducer/Reducer"
import reportReducer from "./ReportReducer/Reducer"

const reducersCombined={
    userReducer:userReducer,
    mapReducer: mapReducer,
    modalReducer: modalReducer,
    reportReducer: reportReducer
}

const rootReducer = combineReducers(reducersCombined)

export default rootReducer