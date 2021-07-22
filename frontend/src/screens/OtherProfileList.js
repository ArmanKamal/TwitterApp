import React, { useEffect,useRef, useState } from "react";
import { user_profile_list } from "../actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { user_follow,user_unfollow } from "../actions/UserAction";
import "../App.css";

function OtherProfileList({ history,match }) {
const [follow, setfollow] = useState()





  const userPublicProfileList = useSelector(
    (state) => state.UserPublicProfileList
  );
  const { users } = userPublicProfileList;

  const userLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = userLogin;

  

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(user_profile_list());

  }, [dispatch]);


  const handleFollowAction = (username) => {
    
      dispatch(user_follow(username))
      
    
    
  }

  
  const handleUnFollowAction = (username) => {
    
    dispatch(user_unfollow(username))
 
}
  return (
    <div className="col-md-4 mx-auto">
      
      <ul className="list">
        {users.map((user) => {
          return (
            <li className="list-item card my-4" key={user.id}>
              <div>
                {user.profile_pic ? (
                  <img
                    src="{user.profile_pic}"
                    height="40px"
                    className="mx-2 img-responsive"
                    alt="profile_pic"
                  />
                ) : (
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    className="mx-4 img-responsive"
                    height="40px"
                    alt="profile_pic"
                  />
                )}
              </div>
              <div className="list-item-content">
                <h4 className="my-2 mx-2">
                  {user.first_name} {user.last_name}
                </h4>
               
              </div>
            <button className="btn btn-info mx-4"  onClick={() => {handleUnFollowAction(user.username)}}>Unfollow</button>
               
            <button className="btn btn-info mx-4 my-2"  onClick={() => {handleFollowAction(user.username)}}>Follow</button>
               

            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OtherProfileList;
