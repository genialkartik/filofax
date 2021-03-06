import {
    Paper, TextField, Button, makeStyles
} from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles((theme)=>({
    signRestPage:{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0'
    },
    input:{
        marginBottom: theme.spacing(3),
        width: '90%'
    }
}))

function SignUp(){
    const classes = useStyles();
    return(
        <>
        <Header/>
        <div className={`SignUp restpage ${classes.signRestPage}`}>
            <Paper style={{
                maxWidth: '350px',
                margin: '0 auto',
                padding: '1rem',
                textAlign: 'center',
                height: '100%'
            }}>
                <form>
                    <h2>SignUp</h2>
                    <TextField className={classes.input} size="small" variant="outlined" placeholder="Enter Email" />
                    <TextField className={classes.input} size="small" variant="outlined" placeholder="Enter Password" />
                    <TextField className={classes.input} size="small" variant="outlined" placeholder="Enter Secure Pin" />
                    <Button style={{marginBottom: '2rem'}} type="submit" variant="outlined" color="primary">Submit</Button>
                </form>
            </Paper>
        </div>
        </>
    )
}
export default SignUp;