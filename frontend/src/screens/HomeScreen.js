import React from 'react'
import { Link } from 'react-router-dom'
import TweetForm from '../component/Tweets/TweetForm'
import TweetList from '../component/Tweets/TweetList'

function HomeScreen() {
    return (
        <div>
             <Link to="/login">Login</Link>
            <TweetList />
        </div>
    )
}

export default HomeScreen
