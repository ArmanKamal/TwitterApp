export const TweetListReducer = (state = {tweets:[]},action) =>{
    switch(action.type){
        case "TWEET_LIST_LOADING":
            return {loading:true, tweets:[]}
    
        case "TWEET_LIST_SUCCESS":
            return {loading:false, tweets: action.payload}

        case "TWEET_LIST_FAILED":
            return {loading:false, error: action.payload}
        

        default:
            return state
     }
}   

export const TweetFeedReducer = (state = {tweets:[]},action) =>{
    switch(action.type){
        case "TWEET_FEED_LOADING":
            return {loading:true, tweets:[]}
    
        case "TWEET_FEED_SUCCESS":
            return {loading:false, tweets: action.payload}

        case "TWEET_FEED_FAILED":
            return {loading:false, error: action.payload}
        

        default:
            return state
     }
}   


export const TweetDetailReducer = (state = {},action) =>{
    switch(action.type){
        case "TWEET_DETAIL_LOADING":
            return {loading:true}
    
        case "TWEET_DETAIL_SUCCESS":
            return {loading:false, tweet: action.payload}

        case "TWEET_DETAIL_FAIL":
            return {loading:false, error: action.payload}
        

        default:
            return state
     }
}   


export const TweetCreateReducer = (state={},action) => {
    switch(action.type){
        case "TWEET_CREATE_REQUEST":
            return {loading: true}

        case "TWEET_CREATE_SUCCESS":
            return {loading:false, success:true,tweet: action.payload}

        case "TWEET_CREATE_FAIL":
            return {loading:false,error:action.payload}
        case "TWEET_CREATE_RESET":
                return {}
        default:
            return state
    }    
}

export const TweetActionReducer = (state={},action) => {
    switch(action.type){
        case "TWEET_ACTION_REQUEST":
            return {loading: true}

        case "TWEET_ACTION_SUCCESS":
            return {loading:false, success:true}

        case "TWEET_ACTION_FAIL":
            return {loading:false,error:action.payload}
 
        case "TWEET_ACTION_RESET":
                return {}
        default:
            return state
    }    
}

export const TweetDeleteReducer = (state={},action) => {
    switch(action.type){
        case "TWEET_DELETE_REQUEST":
            return {loading: true}

        case "TWEET_DELETE_SUCCESS":
            return {loading:false, success:true}

        case "TWEET_DELETE_FAIL":
            return {loading:false,error:action.payload}
 
        case "TWEET_DELETE_RESET":
                return {}
        default:
            return state
    }    
}



