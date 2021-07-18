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
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
               

                {userInfo? (
                    <li className="nav-item dropdown">
                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userInfo.name}
                         </a>
                         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                         <Link to = "/profile" className="dropdown-item" >Profile</Link>
                         <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item" href="#">Something else here</a>
                         </div>
                     </li>
                ):   
                <li className="nav-item">
                     <Link className="nav-link" to="/login">Login</Link>
                </li>
                    }

           
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
