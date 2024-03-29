import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {user_detail,update_profile} from '../actions/UserAction'
import Message  from '../component/Message'

function ProfileScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.UserDetail)
    const {user,error} = userDetails

    const userLogin = useSelector(state => state.UserLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.UserUpdateProfile)
    const {success} = userUpdateProfile




    useEffect(() => {
        console.log(userInfo)
        if(!userInfo){
            history.push('/login')
        }
        else{
            
            if(!user || !user.name || success){
                dispatch({type: "USER_UPDATE_PROFILE_RESET"})
                dispatch(user_detail('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
           
            }
        }
        if(success){
            setMessage('Updated...')
        }
    },[dispatch,user, history,userInfo,success])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password donot match')
        }
        else{
            dispatch(update_profile({
                'id': user.id,
                'name':name,
                'email':email,
                'password':password
            }))

            setMessage('')
         
        }   
        
    }

    return (
        <div className="wrapper">
                <div className="col-md-6 mx-auto">
                    <form className="form-signin" onSubmit={handleSubmit}>       
                        <h2 className="form-signin-heading text-center mb-2">User Profile</h2>
                        {message && <Message>{message}</Message>}
                        {error && <Message>{error}</Message>}
                        <input type="text" required className="form-control my-4" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Enter Username"  />
                        <input type="text" required className="form-control my-4" value={email} onChange={(e) => setEmail(e.target.value)} name="username" placeholder="Email Address"  />
                        <input type="password"  className="form-control my-4" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password"  />   
                        <input type="password"  className="form-control my-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirm_pw" placeholder="Confirm Password"  />       
                        <button className="btn form-control btn-success " type="submit">Update</button>   
                    </form>
                </div>
        </div>
    )
}

export default ProfileScreen
