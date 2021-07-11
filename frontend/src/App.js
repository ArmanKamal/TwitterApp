import React, {useEffect, useState} from 'react'
import TweetList from './component/Tweets/TweetList'
import Navbar from './component/Navbar';
import TweetCreate from './component/Tweets/TweetCreate';

function App() {

  const [tweets, setTweets] = useState([])
  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/tweets/')
     .then((response) => response.json())
     .then((data) => setTweets(data))
  
  }, [])

  return (
    <React.Fragment>
       <Navbar />
       <div className="container mx-auto">
         <TweetCreate />
        {tweets.map((tweet) => 
          <TweetList tweet={tweet} />
        )}
       </div>
   
    </React.Fragment>
  );
}

export default App;
