import CounterReducer from './Counter'
import VendingReducer from './VendingReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    CounterReducer,
    VendingReducer
})

export default rootReducer;