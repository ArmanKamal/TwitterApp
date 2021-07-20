import axios from 'axios'
import React,{useState} from 'react'
import { tweet_like,tweet_dislike,tweet_retweet } from '../../actions/TweetAction'
import {useDispatch,useSelector} from 'react-redux'


const SingleTweet = ({tweet}) => {
    const [like, setlike] = useState()
    const dispatch = useDispatch()
    const TweetAction = useSelector(state => state.TweetAction)
    const {success} = TweetAction
  

    const handleLike = () => {
        dispatch(tweet_like(tweet.id))

            setlike(true)
       
    }
 
    const handleUnlike = () => {
        dispatch(tweet_dislike(tweet.id))
      
        setlike(false)
       
    }

    const handleRetweet = () => {
        dispatch(tweet_retweet(tweet.id))
    
    }

    return (
        <div className="card">
            <div className="card-body">
                <div>
                    <h2 className="text-success">{tweet.content}</h2>
                    {tweet.parent && <div><SingleTweet tweet={tweet.parent} /></div>}
                </div>
                {like? <button onClick={handleUnlike} className="btn btn-info">{tweet.likers} unlike</button>:  <button onClick={handleLike} className="btn btn-info">{tweet.likers} like</button>}
                    
                <button onClick={handleRetweet} className="btn btn-info">Retweet</button>
            </div>
       
            <hr />
        </div>
    )
}

export default SingleTweet
