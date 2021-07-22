import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleTweet from './SingleTweet'
import TweetForm from './TweetForm'
import { listTweet } from '../../actions/TweetAction'
import Loader from '../Loader'
import Message from '../Message'
function TweetList(props) {

    const TweetList = useSelector(state => state.TweetList)

    const { error, loading, tweets} = TweetList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listTweet())
     
    }, [dispatch])

  


    const canTweet = props.canTweet === 'false'? true: true
    return (
        <React.Fragment>
            {canTweet === true && <TweetForm  />}
        
         {error &&<Message>{error}</Message> }
         
            if(loading != true){
                 <div>
                    {tweets.map((tweet) => 
                        <SingleTweet tweet={tweet} key={tweet.id}/>
                    )}
                 </div> 
            
            }
                   
        
        </React.Fragment>
    )
}

export default TweetList
