import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/UserAction'
function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            Login Screen
        </div>
    )
}

export default LoginScreen
