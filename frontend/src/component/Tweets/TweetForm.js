import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { tweet_create,listTweet } from '../../actions/TweetAction';
import '../../App.css'
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

    const wrapper = {}


    return (
        <div className="row wrapper">
            <form className="form" onSubmit={handleSubmit} method="POST">
                <div className="col-md-12">
                <textarea  className="form-control" rows="2" cols="10"  onChange={(e) => setContent(e.target.value)} value={content} name="content"  placeholder="What's happening?"></textarea>
                </div>
                <button className="btn btn-success my-2" type="submit">Tweet</button>
            </form>
            <hr />
        </div>
      
    );

}
export default TweetForm