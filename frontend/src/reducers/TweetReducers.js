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