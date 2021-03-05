import { useState } from 'react';
import { Link } from '@reach/router';
import {
  Button, TextField, makeStyles, Modal
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
    width: '90%'
  }
}))

function Home() {
  const classes = useStyles();
  const [isPasswordVisible, setPassVisible] = useState(false);
  const [isAddActive, setAddActive] = useState(false);
  const [openPinModal, SetOpenPinModal] = useState(false);

  const toggleAddNew = () => {
    setAddActive(!isAddActive);
  }

  const handleAddNew = (e) => {
    e.preventDefault();
    console.log('form submited');
  }

  const handlePinModal = () => {
    SetOpenPinModal(!openPinModal);
  }

  const handleShowPass = () => {
    setPassVisible(!isPasswordVisible);
  }

  return (
    <>
      <header className="App-header">
        <div className="nav-container">
          <div className="app-brand">
            <Link to="/home" className="app-brand-link">passManager</Link>
          </div>
          <div className="app-links">
            <ul className="nav-lists">
              <li className="nav-link">
                <span className="nav-item">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="Home restpage">
        <div className="search-container">
          <div className="searchbar">
            <TextField variant="outlined" type="text" placeholder="Search platform..." size="small" />
            <Button variant="contained" color="primary" size="small"
              onClick={toggleAddNew}>Add New</Button>
          </div>
        </div>
        {isAddActive ?
          <div className="add-new-container">
            <div className="add-new">
              <form onSubmit={(e) => handleAddNew(e)}>
                <TextField variant="outlined" className={classes.input} type="text" placeholder="Company Name" size="small" />
                <TextField variant="outlined" className={classes.input} type="text" placeholder="Url" size="small" />
                <TextField variant="outlined" className={classes.input} type="text" placeholder="Username" size="small" />
                <TextField variant="outlined" className={classes.input} type="text" placeholder="Email" size="small" />
                <TextField variant="outlined" className={classes.input} type="text" placeholder="Password" size="small" />
                <Button variant="contained" color="primary" size="small" type="submit">Save</Button>
              </form>
            </div>
          </div>
          : null}
        <div className="search-results-container">
          <div className="search-results">

            <div className="result_box">
              <div className="detail-item">
                <span>TItle : </span><span>Heroku</span>
              </div>
              <div className="detail-item">
                <span>url : </span><span><a target="_blank" href="dashboard.heroku.com/login">dashboard.heroku.com/login</a></span>
              </div>
              <div className="detail-item">
                <span>Username : </span><span>Mongo123</span>
              </div>
              <div className="detail-item">
                <span>Email : </span><span>xyz@gmail.com</span>
              </div>
              <div className="detail-item" id="pass-view">
                <span>Password : </span>
                <span>
                  <input type="password" value="xyZ@143#" disabled />
                  <button type="button" onClick={handlePinModal}>
                    {
                      isPasswordVisible ?
                        <VisibilityOffIcon />
                        :
                        <VisibilityIcon />
                    }
                  </button>
                </span>
              </div>
              <div className="detail-item">
                <span>Note: </span>
                <span>
                  <textarea placeholder="Add your notes..." cols="32" rows="1"></textarea>
                </span>
              </div>
            </div>
            <Modal
              open={openPinModal}
              onClose={handlePinModal}
            >
              <h3>Secure Verification</h3>
              <TextField type="password" placeholder="Enter Pin" variant="outlined" label="Pin" />
              <Button variant="contained" color="primary" onClick={handleShowPass}>Submit</Button>
            </Modal>
            <div className="result_box">
              <div className="detail-item">
                <span>Company Name : </span><span>Heroku</span>
              </div>
              <div className="detail-item">
                <span>url : </span><span><a target="_blank" href="dashboard.heroku.com/login">dashboard.heroku.com/login</a></span>
              </div>
              <div className="detail-item">
                <span>Username : </span><span>Mongo123</span>
              </div>
              <div className="detail-item">
                <span>Email : </span><span>xyz@gmail.com</span>
              </div>
              <div className="detail-item" id="pass-view">
                <span>Password : </span>
                <span>
                  <input type="password" value="xyZ@143#" disabled />
                  <button type="button">
                    {
                      isPasswordVisible ?
                        <VisibilityOffIcon />
                        :
                        <VisibilityIcon />
                    }
                  </button>
                </span>
              </div>
              <div className="detail-item">
                <span>Note: </span>
                <span>
                  <textarea placeholder="Add your notes..." cols="32" rows="1"></textarea>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;