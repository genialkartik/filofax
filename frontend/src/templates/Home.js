import { useEffect, useState } from 'react';
import {
  Button, TextField, makeStyles, Modal
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';
import axios from 'axios';
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
    width: '90%',
  },
  modalPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
}))

function Home() {
  const classes = useStyles();
  const [isPasswordVisible, setPassVisible] = useState(false);
  const [isAddActive, setAddActive] = useState(false);
  const [openPinModal, SetOpenPinModal] = useState(false);

  const handleAddNew = (e) => {
    e.preventDefault();
    console.log('form submited');
  }

  const handlePinModalOpen = () => {
    SetOpenPinModal(true);
  }

  const handlePinModalClose = () => {
    SetOpenPinModal(false);
  }

  const handleShowPass = () => {
    setPassVisible(!isPasswordVisible);
  }

  // useEffect(()=>{
  //   axios.get('')
  // },[]);

  return (
    <>
      <Header/>
      <div className="Home restpage">
        <div className="search-container">
          <div className="searchbar">
            <TextField variant="outlined" type="text" placeholder="Search platform..." size="small" />
            <Button style={{marginLeft: 'auto'}} variant="contained" color="primary" size="medium"
              onClick={()=>setAddActive(true)}>Add New</Button>
          </div>
        </div>
        
        <Modal open={isAddActive} onClose={()=>setAddActive(false)}>
          <div className={`add-new-container ${classes.modalPaper}`}>
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
        </Modal>
        
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
                  <input style={{width: 'calc(100% - 50px)'}} type="password" value="xyZ@143#" disabled />
                  <button style={{width: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',}} type="button" onClick={handlePinModalOpen}>
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
              onClose={handlePinModalClose}
            >
              <div className={classes.modalPaper}>
                <h3>Secure Verification</h3>
                <TextField type="password" placeholder="Enter Pin" variant="outlined" label="Pin" size="small"/>
                <Button variant="contained" size="medium" color="primary" onClick={handleShowPass}>Submit</Button>
              </div>
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
                  <input style={{width: 'calc(100% - 50px)'}} type="password" value="xyZ@143#" disabled />
                  <button style={{width: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',}}
                    onClick={handlePinModalOpen}
                    type="button">
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