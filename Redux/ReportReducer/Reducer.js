import ReportActionTypes from "./Action-types"

const reportInitialState={
    userComment: "",
    selectedOption: null,
    startDate: new Date(),
    endDate: new Date(),
    markerPoints: [],
    image: null,
    currentPoint: { position: { lat: 0, lng: 0 }, id: -1, concluded: "Em aberto", occurrence_type: "Postes Danificados", comment:"" }
}

const reportReducer=(state=reportInitialState, action)=>{
    switch(action.type){
        case ReportActionTypes.SET_USER_COMMENT:
            return { ...state, userComment: action.payload }
        case ReportActionTypes.SET_SELECTED_OPTION:
            return { ...state, selectedOption: action.payload }
        case ReportActionTypes.SET_START_DATE:
            return { ...state, startDate: action.payload }
        case ReportActionTypes.SET_END_DATE:
            return { ...state, endDate: action.payload }
        case ReportActionTypes.SET_MARKER_POINTS:
            return { ...state, markerPoints: action.payload }
        case ReportActionTypes.SET_CURRENT_POINT:
            return { ...state, currentPoint: action.payload }
        case ReportActionTypes.SET_IMAGE:
            return { ...state, image: action.payload }
        default:
            return state
    }
}

export default reportReducer
