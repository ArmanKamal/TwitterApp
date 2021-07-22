import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { tweet_detail } from '../actions/TweetAction'
import Message from '../component/Message'
import SingleTweet from '../component/Tweets/SingleTweet'

function TweetDetailScreen({match}) {

    const TweetDetail = useSelector(state => state.TweetDetail)
    const { error, loading, tweet} = TweetDetail
    
    const tweet_id = match.params.id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(tweet_detail(tweet_id))
        
    }, [dispatch])


    return (
        
        <React.Fragment>
            {error && <Message>{error}</Message>}
            {tweet?(
                <div className="col-md-8 mx-auto">
                     <SingleTweet tweet={tweet} />
                </div>
               
            ):(<Message>No Tweet Found</Message>)
            }

        </React.Fragment>
        )
    
}

export default TweetDetailScreen
