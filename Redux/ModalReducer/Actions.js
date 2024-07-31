import ModalActionTypes from "./Action-types"

export const setIsProfileModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_PROFILE_MODAL_ON,
    payload: payload
})

export const setIsChangeNumberModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_CHANGE_NUMBER_MODAL_ON,
    payload: payload
})

export const setIsChangePasswordModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_CHANGE_PASSWORD_MODAL_ON,
    payload: payload
})

export const setIsSearchModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_SEARCH_MODAL_ON,
    payload: payload
})

export const setIsPostOccurrenceModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_POST_OCCURRENCE_MODAL_ON,
    payload: payload
})

export const setIsSearchResultsModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_SEARCH_RESULTS_MODAL_ON,
    payload: payload
})

export const setIsOccurrenceModalOn=(payload)=>({
    type: ModalActionTypes.SET_IS_OCCURRENCE_MODAL_ON,
    payload: payload
})