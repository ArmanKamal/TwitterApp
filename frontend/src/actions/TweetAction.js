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