import MapActionTypes from "./Action-types"

const mapState={
    loadingMap: null
}

const mapReducer=(state=mapState, action)=>{
    switch(action.type){
        case MapActionTypes.SET_LOADING_MAP:
            return { ...state, loadingMap: action.payload }
        default:
            return state
    }
}

export default mapReducer