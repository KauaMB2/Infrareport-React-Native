import MapActionTypes from "./Action-types"

export const setLoadingMap=(payload)=>({
    type: MapActionTypes.SET_LOADING_MAP,
    payload: payload
})