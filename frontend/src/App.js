import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [tweets, setTweets] = useState([])
  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/tweets/')
     .then((response) => response.json())
     .then((data) => setTweets(data))
  
  }, [])

  return (
    <div className="App">
      {tweets.map((tweet) => 
      <div>
        <h1>{tweet.user}</h1>
        <h2>{tweet.content}</h2>
      </div>
      )}
    </div>
  );
}

export default App;
