import './App.css';
import {useEffect, useState} from 'react'
import TweetList from './component/Tweets/TweetList'
import Navbar from './component/Navbar';

function App() {

  const [tweets, setTweets] = useState([])
  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/tweets/')
     .then((response) => response.json())
     .then((data) => setTweets(data))
  
  }, [])

  return (
    <>
       <Navbar />
      {tweets.map((tweet) => 
        <TweetList tweet={tweet} />
      )}
    </>
  );
}

export default App;
