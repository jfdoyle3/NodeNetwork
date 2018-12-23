import {combineReducers} from 'redux';
import authReducer from './authrReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    errors:errorReducer
});