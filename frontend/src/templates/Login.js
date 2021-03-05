import { Link } from '@reach/router';
import {
    Paper, TextField, Button, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    loginRestPage:{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0'
    },
    input:{
        marginBottom: theme.spacing(3),
        width: '90%'
    }
}))

function Login(){
    const classes = useStyles();
    return(
        <>
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
        <div className={`Login restpage ${classes.loginRestPage}`}>
            <Paper style={{
                maxWidth: '350px',
                margin: '0 auto',
                padding: '1rem',
                textAlign: 'center',
                height: '100%'
            }}>
                <form>
                    <h2>Login</h2>
                    <TextField className={classes.input} size="small" variant="outlined" placeholder="Enter Email" />
                    <TextField className={classes.input} size="small" variant="outlined" placeholder="Enter Password" />
                    <Button style={{marginBottom: '2rem'}} type="submit" variant="outlined" color="primary">Submit</Button>
                </form>
            </Paper>
        </div>
        </>
    )
}
export default Login;