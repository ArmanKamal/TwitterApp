export const UserLoginReducer = (state={}, action) =>{
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return {loading: true}

        case "USER_LOGIN_SUCCESS":
            console.log(action.payload)
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

        case "USER_DETAIL_RESET":
            return {user:{}}

        case "USER_DETAIL_FAIL":
            return {loading:false,error:action.payload}

        default:
            return state
    }  
}


export const UserUpdateProfileReducer = (state={},action) => {
    switch(action.type){
        case "USER_UPDATE_PROFILE_REQUEST":
            return {loading: true}

        case "USER_UPDATE_PROFILE_SUCCESS":
            return {loading:false, success:true, userInfo: action.payload}

        case "USER_UPDATE_PROFILE_RESET":
            return {}

        case "USER_UPDATE_PROFILE_ FAIL":
            return {loading:false,error:action.payload}

        default:
            return state
    }  
}




export const UserPublicProfileReducer = (state={user:{}},action) => {
    switch(action.type){
        case "USER_PROFILE_REQUEST":
            return {...state,loading: true}

        case "USER_PROFILE_SUCCESS":
            return {loading:false, user:action.payload}

        case "USER_PROFILE_RESET":
            return {user:{}}

        case "USER_PROFILE_FAIL":
            return {loading:false,error:action.payload}

        default:
            return state
    }  
}



export const UserUpdatePublicProfileReducer = (state={},action) => {
    switch(action.type){
        case "USER_UPDATE_PUBLIC_PROFILE_REQUEST":
            return {loading: true}

        case "USER_UPDATE_PUBLIC_PROFILE_SUCCESS":
            return {loading:false, success:true, userInfo: action.payload}

        case "USER_UPDATE_PUBLIC_PROFILE_RESET":
            return {}

        case "USER_UPDATE_PUBLIC_PROFILE_FAIL":
            return {loading:false,error:action.payload}

        default:
            return state
    }  
}