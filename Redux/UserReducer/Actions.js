import UserActionTypes from "./Action-types"

export const setUserLogin=(payload)=>({//action to a login
    type: UserActionTypes.LOGIN,
    payload: payload
})

export const setUserName=(payload)=>({//action to set the name
    type: UserActionTypes.SET_NAME,
    payload: payload
})

export const setUserPosition=(payload)=>({//action to set the position
    type: UserActionTypes.SET_POSITION,
    payload: payload
})

export const setUserPassword=(payload)=>({//action to set the password
    type: UserActionTypes.SET_PASSWORD,
    payload: payload
})

export const setUserPoints=(payload)=>({//action to set the points
    type: UserActionTypes.SET_POINTS,
    payload: payload
})

export const setUserCategory=(payload)=>({//action to set the category of the user
    type: UserActionTypes.SET_CATEGORY,
    payload: payload
})

export const setUserCep=(payload)=>({//action to set the cep of the user
    type: UserActionTypes.SET_CEP,
    payload: payload
})

export const setUserCellphone=(payload)=>({//action to set the cellphone of the user
    type: UserActionTypes.SET_CELLPHONE,
    payload: payload
})

export const setUserEmail=(payload)=>({//action to set the email of the user
    type: UserActionTypes.SET_EMAIL,
    payload: payload
})

export const setProfileMedal=(payload)=>({
    type: UserActionTypes.SET_MEDAL,
    payload: payload
})

export const setUserCityName=(payload)=>({
    type: UserActionTypes.SET_CITY_NAME,
    payload: payload
})

