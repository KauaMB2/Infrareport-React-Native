import UserActionTypes from "./Action-types"

const userInitialState={
    position: null,
    email: null,
    password: null,
    cellphone: null,
    cep: null,
    cityName: null,
    points: null,
    profileCategory: null,
    profileMedal: null,
    name: null
}

const userReducer=(state=userInitialState, action)=>{
    switch(action.type){
        case UserActionTypes.SET_EMAIL:
            return { ...state, email: action.payload }
        case UserActionTypes.SET_NAME:
            return { ...state, name: action.payload }
        case UserActionTypes.SET_CELLPHONE:
            return { ...state, cellphone: action.payload }
        case UserActionTypes.SET_PASSWORD:
            return { ...state, password: action.payload }
        case UserActionTypes.SET_POINTS:
            return { ...state, points: action.payload }
        case UserActionTypes.SET_POSITION:
            return { ...state, position: action.payload }
        case UserActionTypes.SET_CATEGORY:
            return { ...state, profileCategory: action.payload }
        case UserActionTypes.SET_CEP:
            return { ...state, cep: action.payload }
        case UserActionTypes.SET_CITY_NAME:
            return { ...state, cityName: action.payload }
        case UserActionTypes.SET_MEDAL:
            return { ...state, profileMedal: action.payload }
        default:
            return state
    }
}

export default userReducer