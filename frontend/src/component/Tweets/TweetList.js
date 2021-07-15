import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleTweet from './SingleTweet'
import TweetForm from './TweetForm'
import { listTweet } from '../../actions/TweetAction'
function TweetList(props) {
    const {username} = props
    const [tweets, setTweets] = useState([])
    const [currentTweets, setCurrentTweets] = useState([]);
 
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listTweet())
        updateTweets();
    }, [currentTweets])

    const updateTweets = function(){
        let endpoint = 'http://127.0.0.1:8000/api/tweets/'
        if(username){
        endpoint = `http://127.0.0.1:8000/api/tweets/?username=${username}`
        }
        fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
        setTweets(data)
        })
        
    }  

    const newTweet = (data) => {

        let oldTweets = tweets;
        oldTweets.unshift(data)
        setCurrentTweets(data)  
    
    }

    const didRetweet = (data) => {
    console.log(data)
        let oldTweets = tweets;
        oldTweets.unshift(data)
        setCurrentTweets(data)  
    }


    const canTweet = props.canTweet === 'false'? true: true
    return (
        <React.Fragment>
            {canTweet === true && <TweetForm newTweet={newTweet} />}
        
          {tweets.map((tweet) => 
          <SingleTweet tweet={tweet}  didRetweet={didRetweet}/>
        )}
        </React.Fragment>
    )
}

export default TweetList
