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

function Home(props) {
  const classes = useStyles();
  const [isPasswordVisible, setPassVisible] = useState(false);
  const [isAddActive, setAddActive] = useState(false);
  const [openPinModal, SetOpenPinModal] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [passList, setPassList] = useState([]);
  const [pin, setPin] = useState();

  useEffect(() => {
    axios.get('/auth/login')
      .then(res => {
        if (!res.data.loggedin) {
          window.location.replace('/login');
        }
      })
    axios.get('/pass/list')
      .then(res => {
        console.log(res.data)
        setPassList(res.data ? res.data : []);
      })
      .catch(error => {
        console.log(error);
        setPassList([]);
      })
  }, [props])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  const handleAddNew = async (e) => {
    e.preventDefault();
    console.log(formInput);
    await axios.post('/pass/add', {
      formInput
    }).then(res => {
      console.log(res.data);
    })
      .catch(error => {
        console.log(error);

      })
  }

  const handlePinModalOpen = () => {
    SetOpenPinModal(true);
  }

  const handlePinModalClose = () => {
    SetOpenPinModal(false);
  }

  const handleShowPass = async() => {
    setPassVisible(!isPasswordVisible);
  }

  return (
    <>
      <Header />
      <div className="Home restpage">
        <div className="search-container">
          <div className="searchbar">
            <TextField variant="outlined" type="text" placeholder="Search platform..." size="small" />
            <Button style={{ marginLeft: 'auto' }} variant="contained" color="primary" size="medium"
              onClick={() => setAddActive(true)}>Add New</Button>
          </div>
        </div>

        <Modal open={isAddActive} onClose={() => setAddActive(false)}>
          <div className={`add-new-container ${classes.modalPaper}`}>
            <div className="add-new">
              <form onSubmit={handleAddNew} noValidate autoComplete="off">
                <TextField
                  name="title"
                  value={formInput.title}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Company Name" size="small" />
                <TextField
                  name="url"
                  value={formInput.url}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Url" size="small" />
                <TextField
                  name="username"
                  value={formInput.username}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Username" size="small" />
                <TextField
                  name="email"
                  value={formInput.email}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Email" size="small" />
                <TextField
                  name="password"
                  value={formInput.password}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Password" size="small" />
                <TextField
                  name="note"
                  value={formInput.note}
                  onChange={handleInputChange}
                  variant="outlined" className={classes.input} type="text" placeholder="Note" size="large" />
                <Button variant="contained" color="primary" size="small" type="submit">Save</Button>
              </form>
            </div>
          </div>
        </Modal>

        <div className="search-results-container">
          <div className="search-results">
            {passList && passList.length > 0 ?
              passList.map(pass => (
                <div className="result_box">
                  <div className="detail-item">
                    <span>TItle : </span><span>{pass.title}</span>
                  </div>
                  <div className="detail-item">
                    <span>url : </span><span><a target="_blank" href={pass.url}>{pass.url}</a></span>
                  </div>
                  <div className="detail-item">
                    <span>Username : </span><span>{pass.username}</span>
                  </div>
                  <div className="detail-item">
                    <span>Email : </span><span>{pass.email}</span>
                  </div>
                  <div className="detail-item" id="pass-view">
                    <span>Password : </span>
                    <span>
                      <input style={{ width: 'calc(100% - 50px)' }} type="password" value={pass.password} disabled />
                      <button style={{
                        width: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} type="button" onClick={handlePinModalOpen}>
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
                      <textarea placeholder="Add your notes..." cols="32" rows="1">{pass.note}</textarea>
                    </span>
                  </div>
                </div>
              )) :
              <div className="result_box">
                <div className="detail-item">
                  <span>No password list found</span>
                </div>
              </div>}
            <Modal
              open={openPinModal}
              onClose={handlePinModalClose}
            >
              <div className={classes.modalPaper}>
                <h3>Secure Verification</h3>
                <TextField
                  onChange={e => setPin(e.target.value)}
                  type="password" placeholder="Enter Pin" variant="outlined" label="Pin" size="small" />
                <Button variant="contained" size="medium" color="primary" onClick={handleShowPass}>Submit</Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;