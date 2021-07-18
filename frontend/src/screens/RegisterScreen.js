import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/UserAction'
import Message  from '../component/Message'

function RegisterScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.UserRegisterReducer)
    const {loading,userInfo,error} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Password donot match')
        }
        else{
            dispatch(register(name, email,password))
        }
     
    }

    return (
        <div className="wrapper">
                <div className="col-md-6 mx-auto">
                    <form className="form-signin" onSubmit={handleSubmit}>       
                        <h2 className="form-signin-heading">Register Here</h2>
                        {message && <Message>{message}</Message>}
                        {error && <Message>{error}</Message>}
                        <input type="text" required className="form-control my-4" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Enter Username"  />
                        <input type="text" required className="form-control my-4" value={email} onChange={(e) => setEmail(e.target.value)} name="username" placeholder="Email Address"  />
                        <input type="password" required className="form-control my-4" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password"  />   
                        <input type="password" required className="form-control my-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirm_pw" placeholder="Confirm Password"  />       
                        <button className="btn form-control btn-success " type="submit">Register</button>   
                    </form>
                    <div className="row">
                        <div className="col">
                            Already  have an account<Link  to="/login">Login</Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default RegisterScreen
