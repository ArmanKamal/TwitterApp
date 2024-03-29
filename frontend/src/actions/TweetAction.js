import axios from 'axios'

export const listTweet = () => async (dispatch,getState) => {
    try{
            dispatch({type: "TWEET_LIST_LOADING"})

            let endpoint = 'http://127.0.0.1:8000/api/tweets/'

            const { 
                UserLogin: { userInfo},
            } = getState()
    

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(endpoint,config)
            
                dispatch({
                    type: "TWEET_LIST_SUCCESS",
                    payload: data
                })
            
       

    }

    catch(error){
        dispatch({
            type: "TWEET_LIST_FAILED",
            payload: error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}


export const tweet_feed_only_view = () => async (dispatch,getState) => {
    try{
            dispatch({type: "TWEET_FEED_LOADING"})

            let endpoint = 'http://127.0.0.1:8000/api/tweets/feed/'

            const { 
                UserLogin: { userInfo},
            } = getState()
    

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(endpoint,config)
            
                dispatch({
                    type: "TWEET_FEED_SUCCESS",
                    payload: data
                })
            
       

    }

    catch(error){
        dispatch({
            type: "TWEET_FEED_FAILED",
            payload: error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}


export const tweet_detail = (id) => async (dispatch,getState) => {
    try{
            dispatch({type: "TWEET_DETAIL_LOADING"})

            let endpoint = `http://127.0.0.1:8000/api/tweets/${id}`

            const { 
                UserLogin: { userInfo},
            } = getState()
    

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(endpoint,config)
            
                dispatch({
                    type: "TWEET_DETAIL_SUCCESS",
                    payload: data
                })
            
       

    }

    catch(error){
        dispatch({
            type: "TWEET_DETAIL_FAIL",
            payload: error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}



export const tweet_create = (content,image) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_CREATE_REQUEST"
        })

        const { 
            UserLogin: { userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let formData = new FormData();
        formData.append('content',content)
        formData.append('image',image)        
        let endpoint = 'http://127.0.0.1:8000/api/tweets/create/'
        const {data} = await axios.post(endpoint,formData,config
            )
 
        dispatch({
                type:"TWEET_CREATE_SUCCESS",
                payload:data
        }) 
      
        }
    

        catch(error){
            dispatch({
                type: "TWEET_CREATE_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }
        
}


export const tweet_like = (tweet_id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_ACTION_REQUEST"
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
        const {data} = await axios.post('http://127.0.0.1:8000/api/tweets/action/',
        {
            id:tweet_id,
            action:"like"
        },config)
 
        dispatch({
                type:"TWEET_ACTION_SUCCESS",
                payload:data
        }) 
      
        }
    

        catch(error){
            dispatch({
                type: "TWEET_ACTION_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }
        
}


export const tweet_dislike = (tweet_id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_ACTION_REQUEST"
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
        const {data} = await axios.post('http://127.0.0.1:8000/api/tweets/action/',
        {
            id:tweet_id,
            action:"unlike"
        },config)
 
        dispatch({
                type:"TWEET_ACTION_SUCCESS",
                payload:data
        }) 
      
        }
    

        catch(error){
            dispatch({
                type: "TWEET_ACTION_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }
        
}



export const tweet_retweet = (tweet_id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_ACTION_REQUEST"
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
        const {data} = await axios.post('http://127.0.0.1:8000/api/tweets/action/',
        {
            id:tweet_id,
            action:"retweet"
        },config)
        
        console.log(data)
 
        dispatch({
                type:"TWEET_ACTION_SUCCESS",
                payload:data
        }) 

      
        }
    

        catch(error){
            dispatch({
                type: "TWEET_ACTION_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }
        
}



export const tweet_delete = (tweet_id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_DELETE_REQUEST"
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
        const {data} = await axios.delete(`http://127.0.0.1:8000/api/tweets/${tweet_id}/delete/`,config)
 
        dispatch({
                type:"TWEET_DELETE_SUCCESS",
                payload:data
        }) 
      
        }
    

        catch(error){
            dispatch({
                type: "TWEET_DELETE_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }
        
}