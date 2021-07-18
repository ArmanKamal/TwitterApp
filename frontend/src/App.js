import React from 'react'
import Navbar from './component/Navbar';
import TweetList from './component/Tweets/TweetList';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

function App(props) {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <main className="py-3">
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
        </main>
      </div>
    
    </Router>
  );
}

export default App;
