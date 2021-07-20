import axios from 'axios'
import React,{useState} from 'react'
import { tweet_like,tweet_dislike,tweet_retweet } from '../../actions/TweetAction'
import { TweetActionReducer } from '../../reducers/TweetReducers'

const SingleTweet = ({tweet,didRetweet}) => {
   const [like, setlike] = useState(false)
    
   config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization:
    }
}

    const handleLike = () => {

    const {data} = axios.post('http://127.0.0.1:8000/api/tweets/action/',
        config,
        {
            id:tweet.id,
            action:"like"
        })

        setlike(true)
    }

    const {data} = axios.post('http://127.0.0.1:8000/api/tweets/action/',
        config,
        {
            id:tweet.id,
            action:"unlike"
        })

        setlike(false)
    }

    
    


    const handleRetweet = () => {
        fetch('http://127.0.0.1:8000/api/tweets/action/',{
           method:'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({
                id: tweet.id,
                action: "retweet"
           })
       })
       .then(response => response.json())
       .then(data => {
           console.log(data)
           didRetweet(data)
       })
    }


 
    
    return (
        <div>
            <div>
                 <h2 className="text-success">{tweet.content}</h2>
                 {tweet.parent && <div><SingleTweet tweet={tweet.parent} /></div>}
            </div>
            {like? <button onClick={handleUnlike} className="btn btn-info">UnLike</button>:  <button onClick={handleLike} className="btn btn-info">{tweet.likers} Like</button>}
                
            <button onClick={handleRetweet} className="btn btn-info">Retweet</button>
            <hr />
        </div>
    )
}

export default SingleTweet
