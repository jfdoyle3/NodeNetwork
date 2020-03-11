import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState={},
 middeware=[thunk],
 store=createStore(
     rootReducer,
     initialState,
     compose(
         applyMiddleware(...middeware),
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
         )

     )

export default store