import React from 'react'
import Navbar from './component/Navbar';
import TweetList from './component/Tweets/TweetList';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PublicProfileScreen from './screens/PublicProfile';
import OtherProfileList from './screens/OtherProfileList';
import TweetDetailScreen from './screens/TweetDetailScreen';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <main className="py-3">
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/settings' component={ProfileScreen} />
          <Route path='/profile' component={PublicProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/tweets/:id' component={TweetDetailScreen} />
          <Route path='/other_profiles/' component={OtherProfileList} />
        </main>
      </div>
    
    </Router>
  );  
}

export default App;
