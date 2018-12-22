import {combineReducers} from 'redux'
import authReducer from './authrReducer'

export default combineReducers({
    auth: authReducer
})