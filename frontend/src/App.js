import { Router } from '@reach/router';
import './App.css';
import Home from './templates/Home';
import Login from './templates/Login';
import SignUp from './templates/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <SignUp path="/register" />
        <Home path="/home" />
      </Router>
    </div>
  );
}

export default App;
