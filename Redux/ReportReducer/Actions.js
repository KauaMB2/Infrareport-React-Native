import ReportActionTypes from "./Action-types"

export const setUserComment=(payload)=>({
    type: ReportActionTypes.SET_USER_COMMENT,
    payload: payload
})

export const setSelectedOption=(payload)=>({
    type: ReportActionTypes.SET_SELECTED_OPTION,
    payload: payload
})

export const setStartDate=(payload)=>({
    type: ReportActionTypes.SET_START_DATE,
    payload: payload
})

export const setEndDate=(payload)=>({
    type: ReportActionTypes.SET_END_DATE,
    payload: payload
})

export const setMarkerPoints=(payload)=>({
    type: ReportActionTypes.SET_MARKER_POINTS,
    payload: payload
})

export const setCurrentPoint=(payload)=>({
    type: ReportActionTypes.SET_CURRENT_POINT,
    payload: payload
})

export const setSelectedImage=(payload)=>({
    type: ReportActionTypes.SET_IMAGE,
    payload: payload
})