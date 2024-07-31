import ModalActionTypes from "./Action-types"

const modalInitialState={
    isProfileModalOn: false,
    isChangeNumberModalOn: false,
    isChangePasswordModalOn: false,
    isSearchModalOn: false,
    isPostOccurrenceModalOn: false,
    isSearchResultsModalOn: false,
    isOccurrenceModalOn: false
}

const modalReducer=(state=modalInitialState, action)=>{
    switch(action.type){
        case ModalActionTypes.SET_IS_PROFILE_MODAL_ON:
            return { ...state, isProfileModalOn: action.payload }
        case ModalActionTypes.SET_IS_CHANGE_NUMBER_MODAL_ON:
            return { ...state, isChangeNumberModalOn: action.payload }
        case ModalActionTypes.SET_IS_CHANGE_PASSWORD_MODAL_ON:
            return { ...state, isChangePasswordModalOn: action.payload }
        case ModalActionTypes.SET_IS_SEARCH_MODAL_ON:
            return { ...state, isSearchModalOn: action.payload }
        case ModalActionTypes.SET_IS_POST_OCCURRENCE_MODAL_ON:
            return { ...state, isPostOccurrenceModalOn: action.payload }
        case ModalActionTypes.SET_IS_SEARCH_RESULTS_MODAL_ON:
            return { ...state, isSearchResultsModalOn: action.payload }
        case ModalActionTypes.SET_IS_OCCURRENCE_MODAL_ON:
            return { ...state, isOccurrenceModalOn: action.payload }
        default:
            return state
    }
}

export default modalReducer