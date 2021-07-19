import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { tweet_create,listTweet } from '../../actions/TweetAction';
const TweetForm = () => {

    
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const tweetCreate = useSelector(state => state.TweetCreate)
    const {tweet,success} = tweetCreate

    const tweetList = useSelector(state => state.TweetList)
    const {tweets} = tweetList

    useEffect(() => {
        if(success){
            dispatch({type: "TWEET_CREATE_RESET"})
            dispatch(listTweet())
        }
    },[dispatch,success])


    const handleSubmit = (e) =>{
        
        e.preventDefault()

        dispatch(
            tweet_create(content)
        )
        setContent('')
       
    }


    return (
        <form className="form" onSubmit={handleSubmit} method="POST">
            <textarea  className="form-control"  onChange={(e) => setContent(e.target.value)} value={content} name="content"  placeholder="What's happening?"></textarea>
            <button  className="btn btn-danger my-4" type="submit">Tweet</button>
        </form>
    );

}
export default TweetForm