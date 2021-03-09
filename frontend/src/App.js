import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './templates/Home';
import Login from './templates/Login';
import SignUp from './templates/SignUp';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route component={Login} exact path="/login" />
        <Route component={SignUp} exact path="/register" />
        <Route component={Home} exact path="/" />
      </Router>
    </div>
  );
}

export default App;
