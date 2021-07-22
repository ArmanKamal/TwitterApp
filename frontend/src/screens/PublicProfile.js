import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user_profile } from "../actions/UserAction";
import "../App.css";
import { tweet_feed_only_view} from '../actions/TweetAction'
import SingleTweet from "../component/Tweets/SingleTweet";

function PublicProfileScreen({ location, history }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const userPublicProfile = useSelector((state) => state.UserPublicProfile);
  const { user } = userPublicProfile;

  const userLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = userLogin;


  
  const tweetFeed = useSelector(state => state.TweetFeed)
  const { error, loading, tweets} = tweetFeed
  


  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(user_profile());
    dispatch(tweet_feed_only_view())
  }, [dispatch]);

  console.log(user);

  return (
    <div className="container">
      <div className="row profile">
        <div className="col-md-3">
          <div className="profile-sidebar">
            <div className="profile-userpic">
              {user.profile_pic ? (
                <img src="{user.profile_pic}" className="img-responsive" alt="" />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  className="img-responsive"
                  alt=""
                />
              )}
            </div>

            <div className="profile-usertitle">
              <div className="profile-usertitle-name">{user.first_name} {user.last_name}</div>
              <h4 className="profile-desc-title">About {user.first_name} {user.last_name}</h4>
              <p>{user.bio}</p>
            </div>

            <div className="profile-userbuttons">
                {userInfo.username !== user.username && <button type="button" className="btn btn-success btn-sm">Follow</button>}
           
            
            </div>

            <div className="portlet light bordered my-2">
              <div className="row list-separated profile-stat ">
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <div className="uppercase profile-stat-title"> {user.follower_count} </div>
                  <div className="uppercase profile-stat-text"> Followers </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <div className="uppercase profile-stat-title" > {user.following_count} </div>
                  <div className="uppercase profile-stat-text"> Following </div>
                </div>

              </div>
              
                 <p>{user.location}</p>
              </div>
            </div>
          </div>
        <div className="col-md-9">
          <div className="profile-content">
                <h3>My Tweets & Retweets</h3>
                
           {
               tweets.map((tweet) => {
                   return(
                    <SingleTweet tweet={tweet} key={tweet.id} />
                   )
               })
           }
           
                
          </div>
        </div>
        </div>
      </div>
  );
}
export default PublicProfileScreen;

