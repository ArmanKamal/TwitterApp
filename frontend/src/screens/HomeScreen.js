import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import TweetForm from '../component/Tweets/TweetForm'
import TweetList from '../component/Tweets/TweetList'
import Message from '../component/Message'


function HomeScreen() {

    const dispatch = useDispatch()
    const tweetCreate = useSelector(state => state.TweetCreate)
    const {loading,tweets,error} = tweetCreate

    return (
        <div>
            {error && <Message>{error}</Message>}
             <Link to="/login">Login</Link>
            <TweetList />
        </div>
    )
}

export default HomeScreen
