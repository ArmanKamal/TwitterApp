import React from 'react'
import Navbar from './component/Navbar';
import TweetList from './component/Tweets/TweetList';


function App(props) {
  


  return (
    <React.Fragment>
       <Navbar />
       <div className="container mx-auto">
        <TweetList username={props.username} canTweet={props.canTweet}/>
       </div>
   
    </React.Fragment>
  );
}

export default App;
