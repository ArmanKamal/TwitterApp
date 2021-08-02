import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "USER_LOGIN_REQUEST"
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const register = (name,email, password) => async(dispatch) =>{
    try{
        dispatch({
            type:"USER_REGISTER_REQUEST"
        })

        let endpoint = 'http://127.0.0.1:8000/api/users/register/'

        const config = {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        
        const {data} = await axios.post(endpoint,{
            'email':email,
            'password':password,
            'name':name
        },config)
        
 
           
        dispatch({
                type:"USER_REGISTER_SUCCESS",
                payload:data
        })

        dispatch({
                type:"USER_LOGIN_SUCCESS",
                payload:data
        })

            localStorage.setItem('userInfo', JSON.stringify(data))
        }

        catch(error){
            dispatch({
                type: "USER_REGISTER_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}

export const logout = () =>(dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: "USER_LOGOUT"
    })

    dispatch({
        type: "USER_DETAIL_RESET"
    })
}


export const user_detail = (id) => async(dispatch, getState ) =>{
    try{
        dispatch({
            type:"USER_DETAIL_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()
        

        let endpoint = `http://127.0.0.1:8000/api/users/${id}/`
     
        const response = await fetch(endpoint, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
            },
          });
          const data = await response.json()
     
          
          dispatch({
                type:"USER_DETAIL_SUCCESS",
                payload:data
            })

            
 
        }

        catch(error){
            dispatch({
                type: "USER_DETAIL_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}



export const update_profile = (user) => async(dispatch, getState ) =>{
    try{
        dispatch({
            type:"USER_UPDATE_PROFILE_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()
        

        let endpoint = `http://127.0.0.1:8000/api/users/profile/update/`
     
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(user)
          });
          const data = await response.json()
          
        dispatch({
                type:"USER_UPDATE_PROFILE_SUCCESS",
                payload:data
            })

        dispatch({
                type:"USER_LOGIN_SUCCESS",
                payload:data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
 
        }

        catch(error){
            dispatch({
                type: "USER_UPDATE_PROFILE_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}



export const user_profile = () => async(dispatch, getState ) =>{
    try{
        dispatch({
            type:"USER__PROFILE_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()

        
        const config = {
            headers:{
                'Content-Type': 'application/json',
        
            }
        }
        let endpoint = `http://127.0.0.1:8000/api/public_profile/${userInfo.username}`
        const {data} = await axios.get(endpoint,
            config
            )

        
          
        dispatch({
                type:"USER_PROFILE_SUCCESS",
                payload:data
            })
 
        }

        catch(error){
            dispatch({
                type: "USER_PROFILE_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}



export const user_profile_list = () => async(dispatch, getState ) =>{
    try{
        dispatch({
            type:"USER__PROFILE_LIST_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()

        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
        
            }
        }
        let endpoint = `http://127.0.0.1:8000/api/public_profiles/`
        const {data} = await axios.get(endpoint,
            config
            )

        
          
        dispatch({
                type:"USER_PROFILE_LIST_SUCCESS",
                payload:data
            })
 
        }

        catch(error){
            dispatch({
                type: "USER_PROFILE_LIST_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}



export const user_follow = (username) => async(dispatch, getState ) =>{
    
    try{
        dispatch({
            type:"USER_FOLLOW_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()

        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
        
            }
        }
        let endpoint = `http://127.0.0.1:8000/api/public_profile/${username}`
        const {data} = await axios.post(endpoint,
            {"action":"follow"},
            config
            )   

        
          
        dispatch({
                type:"USER_FOLLOW_SUCCESS",
                payload:data
            })
 
        }

        catch(error){
            dispatch({
                type: "USER_FOLLOW_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}




export const user_unfollow = (username) => async(dispatch, getState ) =>{
    
    try{
        dispatch({
            type:"USER_UNFOLLOW_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()

        
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
        
            }
        }
        let endpoint = `http://127.0.0.1:8000/api/public_profile/${username}`
        const {data} = await axios.post(endpoint,
            {"action":"unfollow"},
            config
            )

        
          
        dispatch({
                type:"USER_UNFOLLOW_SUCCESS",
                payload:data
            })
 
        }

        catch(error){
            dispatch({
                type: "USER_UNFOLLOW_FAIL",
                payload: error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message
            })
        }
        
}