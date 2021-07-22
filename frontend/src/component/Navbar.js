import React from 'react'
import {useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../actions/UserAction'
function Navbar() {
    
    const userLogin = useSelector(state => state.UserLogin)
    const { userInfo} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
        window.location.reload()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand ml-2" to="/">Tweetify</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               
                {(userInfo)?
                   <ul className="navbar-nav ">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         {userInfo.name}
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to = "/profile" className="dropdown-item" >Profile</Link>
                         <Link to = "/settings" className="dropdown-item" >Settings</Link>
                         <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                      </div>
                    </li>
                    <li className="nav-item ">
                            <Link className="nav-link" to="/other_profiles/">Other Profiles</Link>
                     </li>
                       
                  </ul>
                
                :
                    <ul className="navbar-nav float-right">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                    </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                            
                    </ul>
                            
                    }
                  
                     

           
   
            </div>
        </nav>
    )
}

export default Navbar
