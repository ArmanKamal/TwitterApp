import React, { useState, useEffect } from "react";
import {
  tweet_like,
  tweet_dislike,
  tweet_retweet,
} from "../../actions/TweetAction";

import { useDispatch, useSelector } from "react-redux";

const SingleTweet = ({ tweet }) => {
  const [count, setCount] = useState(tweet.likers);
  const dispatch = useDispatch();
  const TweetAction = useSelector((state) => state.TweetAction);
  const { success } = TweetAction;
  const [liked, setLiked] = useState();

  const handleLike = () => {
    dispatch(tweet_like(tweet.id));
    setCount(count + 1);
    setLiked(true);
  };

  const handleUnlike = () => {
    dispatch(tweet_dislike(tweet.id));
    setCount(count - 1);
    setLiked(false);
  };

  const handleRetweet = () => {
    dispatch(tweet_retweet(tweet.id));
    window.location.reload()
  };

  return (

    
    <div className="card-deck text-center my-2">
      <div className="card col shadow-sm">
        <div className="card-body">
          <div className="row">
         
          </div>
          <div className="row mx-1">
            <div className="col-1">
              <img
                className="rounded-circle"
                src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                alt="profile picture"
                width="70"
                height="70"
              />
            </div>
            <div className="col-10 d-flex justify-content-start">
            {tweet.parent_tweet ?(
                <div>
                  <p className="font-weight-bolder mb-2">You Re-tweeted</p>
                  <ul className="list-unstyled">
                        <li className="ml-3">{tweet.parent_tweet.content}</li>
                 </ul>
                </div>
              )
              :
              <ul className="list-unstyled mt-3 mb-4">
                    <li>{tweet.content}</li>
                </ul>
            }

          
              
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-4">
              <i className="fa fa-retweet" onClick={handleRetweet}></i>
            </div>
            <div className="col-4">
              {liked ? (
                <button className="btn btn-info" onClick={handleUnlike}>
                  {count} unlike
                </button>
              ) : (
                <button className="btn btn-info" onClick={handleLike}>
                  {count} like
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SingleTweet;
