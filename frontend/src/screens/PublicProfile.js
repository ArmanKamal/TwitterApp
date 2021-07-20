import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {user_profile} from '../actions/UserAction'
import Message  from '../component/Message'

function PublicProfileScreen({location,history}) {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userPublicProfile = useSelector(state => state.UserPublicProfile)
    const {user} = userPublicProfile

    const userLogin = useSelector(state => state.UserLogin)
    const {userInfo} = userLogin

 



    useEffect(() => {
   
        if(!userInfo){
            history.push('/login')
        }
        dispatch(user_profile())
        console.log(user)
    },[dispatch])


    return (
        <div className="wrapper">
                <div className="col-md-8 mx-auto">
                    
                </div>
        </div>
    )
}

export default PublicProfileScreen
