import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header(props) {
  const [login, setLogin] = useState(true);


  useEffect(() => {
    axios.get('/auth/login')
      .then(res => {
        setLogin(res.data.loggedin ? true : false);
      })
  }, [props])

  return (
    <header className="App-header">
      <div className="nav-container">
        <div className="app-brand">
          <Link to="/home" className="app-brand-link">passManager</Link>
        </div>
        {login ?
          <div className="app-links">
            <ul className="nav-lists">
              <li className="nav-link">
                <span className="nav-item"
                  onClick={async () => {
                    axios.get('/auth/logout')
                      .then(res => {
                        window.location.replace('/login')
                      })
                  }} >Logout</span>
              </li>
            </ul>
          </div> :
          <div className="app-links">
            <ul className="nav-lists">
              <li className="nav-link">
                <Link to="/login" className="nav-item">Login</Link>
              </li>
              <li className="nav-link">
                <Link to="/register" className="nav-item">Singup</Link>
              </li>
            </ul>
          </div>
        }
      </div>
    </header>
  )
}
export default Header;
