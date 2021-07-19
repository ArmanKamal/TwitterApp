export const UserLoginReducer = (state={}, action) =>{
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return {loading: true}

        case "USER_LOGIN_SUCCESS":
            return {loading:false, userInfo: action.payload}

        case "USER_LOGIN_FAIL":
            return {loading:false,error:action.payload}

        case "USER_LOGOUT":
            return {} 
        default:
            return state
    }
}

export const UserRegisterReducer = (state={},action) => {
    switch(action.type){
        case "USER_REGISTER_REQUEST":
            return {loading: true}

        case "USER_REGISTER_SUCCESS":
            return {loading:false, userInfo: action.payload}

        case "USER_REGISTER_FAIL":
            return {loading:false,error:action.payload}

        case "USER_LOGOUT":
            return {} 
        default:
            return state
    }    
}


export const UserDetailReducer = (state={user:{}},action) => {
    switch(action.type){
        case "USER_DETAIL_REQUEST":
            return {...state,loading: true}

        case "USER_DETAIL_SUCCESS":
            return {loading:false, user: action.payload}

        case "USER_DETAIL_FAIL":
            return {loading:false,error:action.payload}

        default:
            return state
    }  
}