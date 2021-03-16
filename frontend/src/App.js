import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './templates/Home';
import Login from './templates/Login';
import SignUp from './templates/SignUp';
import Uploader from './templates/Uploader';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route component={Login} exact path="/login" />
        <Route component={SignUp} exact path="/register" />
        <Route component={Home} exact path="/" />
        <Route component={Uploader} exact path="/archieves" />
      </Router>
    </div>
  );
}

export default App;
