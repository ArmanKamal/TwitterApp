import React, {useEffect, useState} from 'react'
import TweetList from './component/Tweets/TweetList'
import Navbar from './component/Navbar';
import TweetForm from './component/Tweets/TweetForm';

function App() {

  const [tweets, setTweets] = useState([])
  let newTweets = [ ...tweets]
  const newTweet = (data) => {

    newTweets.unshift(data)
    setTweets(newTweets)
  }

  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/tweets/')
     .then((response) => response.json())
     .then((data) => setTweets(data))
  
  }, [tweets])

  return (
    <React.Fragment>
       <Navbar />
       <div className="container mx-auto">
         <TweetForm newTweet={newTweet}/> 
        {tweets.map((tweet) => 
          <TweetList tweet={tweet} />
        )}
       </div>
   
    </React.Fragment>
  );
}

export default App;
