import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './Root-reducer'

// const store = createStore(rootReducer)// Without debug of every dispatch in the console applied by applyMiddleware
const store = createStore(rootReducer, applyMiddleware(logger)) // With debug of every dispatch

export default store
