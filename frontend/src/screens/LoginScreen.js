import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/UserAction'
import Message  from '../component/Message'

function LoginScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.UserLogin)
    const {loading,userInfo,error} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email == '' || password == ''){
            setMessage('Email or Password field cannot be empty')
        }
        else{
            dispatch(login(email,password))
        }
        console.log(error)
    }

    return (
        <div className="wrapper">
                <div className="col-md-6 mx-auto">
                    <form className="form-signin" onSubmit={handleSubmit}>       
                        <h2 className="form-signin-heading">Please login</h2>
                        {message && <Message>{message}</Message>}
                        {error && <Message>{error}</Message>}
                        <input type="text"  required className="form-control my-4" value={email} onChange={(e) => setEmail(e.target.value)} name="username" placeholder="Email Address"  />
                        <input type="password" required className="form-control my-4" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password"  />      
                        <button className="btn form-control btn-success " type="submit">Login</button>   
                    </form>
                    <div className="row">
                        <div className="col">
                            Don't have an account<Link  to="/register">Register</Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default LoginScreen
