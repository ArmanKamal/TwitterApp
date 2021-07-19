import axios from 'axios'

export const listTweet = () => async (dispatch) => {
    try{
            dispatch({type: "TWEET_LIST_LOADING"})

            let endpoint = 'http://127.0.0.1:8000/api/tweets/'
            
            const response = await fetch(endpoint)

   
                const data = await response.json()
            
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



export const tweet_create = (content) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:"TWEET_CREATE_REQUEST"
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
        let endpoint = 'http://127.0.0.1:8000/api/tweets/create/'
        const {data} = await axios.post(endpoint,
            {'content':content},config
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