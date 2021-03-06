import { Link } from '@reach/router';

function Header (){
    return(
        <header className="App-header">
            <div className="nav-container">
                <div className="app-brand">
                    <Link to="/home" className="app-brand-link">passManager</Link>
                </div>
                <div className="app-links">
                    <ul className="nav-lists">
                        <li className="nav-link">
                            <Link to="/" className="nav-item">Login</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/register" className="nav-item">Singup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header;
