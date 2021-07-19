import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import {TweetListReducer,TweetCreateReducer} from './reducers/TweetReducers'
import { UserDetailReducer, UserLoginReducer, UserRegisterReducer, UserUpdateProfileReducer } from './reducers/UserReducers' 


const reducer = combineReducers({
    TweetList: TweetListReducer,
    UserLogin: UserLoginReducer,
    UserRegisterReducer: UserRegisterReducer,
    UserDetail: UserDetailReducer,
    UserUpdateProfile: UserUpdateProfileReducer,
    TweetCreate: TweetCreateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
             JSON.parse(localStorage.getItem('userInfo')): null
const initialState = {
    UserLogin : {userInfo: userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store