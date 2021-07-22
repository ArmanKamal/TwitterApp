import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import TweetForm from '../component/Tweets/TweetForm'
import TweetList from '../component/Tweets/TweetList'
import Message from '../component/Message'


function HomeScreen({history}) {

    const dispatch = useDispatch()
    const tweetCreate = useSelector(state => state.TweetCreate)
    const {loading,tweets,error} = tweetCreate

    const userLogin = useSelector(state => state.UserLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
 
    }, [userInfo])

    return (
        <div className="container">
        
            {/* {error && <Message>{error}</Message>} */}
            <TweetList />
        </div>
    )
}

export default HomeScreen
