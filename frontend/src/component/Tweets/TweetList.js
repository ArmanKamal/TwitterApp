import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleTweet from './SingleTweet'
import TweetForm from './TweetForm'
import { listTweet } from '../../actions/TweetAction'
import Loader from '../Loader'
import Message from '../Message'
function TweetList(props) {

    const [currentTweets, setCurrentTweets] = useState([]);
    const TweetList = useSelector(state => state.TweetList)
    const { error, loading, tweets} = TweetList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listTweet())
     
    }, [dispatch])

    
    const didRetweet = (data) => {
    console.log(data)
        let oldTweets = tweets;
        oldTweets.unshift(data)
        setCurrentTweets(data)  
    }


    const canTweet = props.canTweet === 'false'? true: true
    return (
        <React.Fragment>
            {canTweet === true && <TweetForm  />}
        {
         error ?<Message>{error}</Message>
                    :
                    <div>
                        {tweets.map((tweet) => 
                            <SingleTweet tweet={tweet} key={tweet.id} didRetweet={didRetweet}/>
                        )}
                    </div> 
                   
        }
        </React.Fragment>
    )
}

export default TweetList
