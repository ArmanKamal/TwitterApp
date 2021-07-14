import React, {useEffect, useState} from 'react'
import TweetList from './component/Tweets/TweetList'
import Navbar from './component/Navbar';
import TweetForm from './component/Tweets/TweetForm';
import getCookie from './csrf_token'
// import { data } from 'jquery';

function App(props) {
  let csrftoken = getCookie('csrftoken');
  const [tweets, setTweets] = useState([])
  const [currentTweets, setCurrentTweets] = useState([]);
  useEffect(() => {
    updateTweets();
  }, [currentTweets])

  const updateTweets = function(){
    console.log("Updating Tweets");
    fetch('http://127.0.0.1:8000/api/tweets/')
     .then((response) => response.json())
     .then((data) => {
      setTweets(data)
      })
    
  }  

  const newTweet = (data) => {

    console.log(data)
    let oldTweets = tweets;
    oldTweets.unshift(data)
    setCurrentTweets(data)  
  
}

const didRetweet = (data) => {
  console.log(data)
    let oldTweets = tweets;
    oldTweets.unshift(data)
    setCurrentTweets(data)  
}
console.log(props)
  return (
    <React.Fragment>
       <Navbar />
       <div className="container mx-auto">
         <TweetForm newTweet={newTweet}/> 
        {tweets.map((tweet) => 
          <TweetList tweet={tweet}  didRetweet={didRetweet}/>
        )}
       </div>
   
    </React.Fragment>
  );
}

export default App;
