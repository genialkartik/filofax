import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles, Button, TextField, Dialog, DialogActions, DialogContent,
  Snackbar
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

function Notes(props) {
  const classes = useStyles();
  const [openNotebookDialog, setOpenNotebookDialog] = useState(false);
  const [notebookList, setNotebookList] = useState([])
  const [notebookTitle, setNotebookTitle] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [editNotebook, setEditNotebook] = useState(null);
  const [noteData, setNoteData] = useState({});
  const [newNoteBool, setNewNoteBool] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [currNotebookId, setCurrNotebookId] = useState();
  const [currNoteId, setCurrNoteId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    (async () => {
      await axios.get('/notes/notebook')
        .then(res => {
          setNotebookList(res.data.notebookList)
        })
        .catch(error => {
          console.log(error);
          setNotebookList([])
        })
    })()
  }, [props])

  const handleNewNotebookDialogBox = () => {
    setOpenNotebookDialog(true);
    setNotebookTitle('');
    setEditNotebook(null);
  };
  const handleCloseNotebookDialogBox = () => {
    setOpenNotebookDialog(false);
    setEditNotebook(null);
    setNotebookTitle('');
  };

  const selectNotebook = async () => {
    // get notes list by notebookid
    setCurrNoteId(null);
    setCurrNotebookId(notebook.notebookid)
    await axios.get(`/notes/note/${notebook.notebookid}`)
      .then(res => {
        console.log(res.data.notesList)
        setNotesList(res.data.notesList);
      })
      .catch(error => {
        console.log(error);
        setNotesList([]);
        setMsg('Something went Strong');
        setSnackOpen(true);
        setTimeout(() => setSnackOpen(false), 1000);
      })
  }

  const addNewNotebook = async () => {
    if (!editNotebook) {
      await axios.post('/notes/notebook', {
        title: notebookTitle
      })
        .then(res => {
          console.log(res.data)
          setOpenNotebookDialog(false);
          setNotebookList(notebooklist => [...notebooklist, res.data.notebook_added])
          setMsg('New Notebook Created')
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000)
        })
        .catch(error => {
          console.log(error);
          setMsg('Something went Strong')
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000)
        })
    } else {
      await axios.put('/notes/notebook', {
        notebookid: editNotebook.notebookid,
        title: notebookTitle
      })
        .then(res => {
          if (res.data.updated) {
            let notebookList_replica = [...notebookList];
            notebookList.map((notebook, index) => {
              if (notebook.notebookid === editNotebook.notebookid) {
                notebookList_replica.splice(index, 1, {
                  _id: editNotebook._id,
                  notebookid: editNotebook.notebookid,
                  title: notebookTitle,
                  user_email: editNotebook.user_email,
                  date_created: editNotebook.date_created
                })
              }
            });
            setNotebookList(notebookList_replica);
            setOpenNotebookDialog(false);
          } else {
            setOpenNotebookDialog(false);
            setMsg('Unable to Update');
            setSnackOpen(true);
            setTimeout(() => setSnackOpen(false), 1000);
          }
        })
        .catch(error => {
          console.log(error);
          setMsg('Something went Strong');
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000);
        })
    }
  }

  const deleteNotebook = async () => {
    // delete notebook
    setCurrNoteId(null);
    await axios.delete('/notes/notebook', {
      data: { notebookid: notebook.notebookid }
    })
      .then(res => {
        console.log(res.data);
        if (res.data.deleted) {
          let not_delete_notebooks = notebookList.filter(nb => nb.notebookid !== notebook.notebookid);
          setNotebookList(not_delete_notebooks);
        } else {
          setMsg('Unable to delete');
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000);
        }
      })
      .catch(error => {
        console.log(error)
        setMsg('Something went Strong');
        setSnackOpen(true);
        setTimeout(() => setSnackOpen(false), 1000);
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  const saveNewNote = async () => {
    console.log(currNoteId)
    console.log(currNotebookId)
    // create new note
    if (!currNoteId && currNotebookId) {
      await axios.post('/notes/note/notebookid', {
        notebookid: currNotebookId,
        notedata: formInput
      })
        .then(res => {
          setNotesList(notes => [...notes, res.data.note_added]);
          setMsg('New Note Created')
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000)
        })
        .catch(error => {
          console.log(error);
          setMsg('Something went Strong')
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000)
        })
    } else if (currNoteId && currNotebookId) {
      // edit note
      await axios.put('/notes/note/notebookid', {
        notebookid: currNotebookId,
        noteid: currNoteId,
        notedata: formInput
      })
        .then(async (res) => {
          if (res.data.updated) {
            setCurrNoteId(currNoteId);
            setCurrNotebookId(currNotebookId)
            await axios.get(`/notes/note/${currNotebookId}`)
              .then(res => {
                setNotesList(res.data.notesList);
              })
              .catch(error => {
                console.log(error);
                setMsg('Update saved, kindly refresh');
                setSnackOpen(true);
                setTimeout(() => setSnackOpen(false), 1000);
              })
          } else {
            setMsg('Unable to update!')
            setSnackOpen(true);
            setTimeout(() => setSnackOpen(false), 1000)
          }
        })
        .catch(error => {
          console.log(error);
          setMsg('Something went Strong')
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000)
        })
    }
    setNewNoteBool(false);
  }

  const deleteNote = async () => {
    // delete note
    setCurrNoteId(null);
    await axios.delete('/notes/note/notebookid', {
      data: { noteid: noteData ? noteData.noteid : '' }
    })
      .then(res => {
        if (res.data.deleted) {
          let not_delete_notes = notesList.filter(notes => notes.noteid !== noteData.noteid);
          setNotesList(not_delete_notes);
          setNoteData({})
        } else {
          setMsg('Unable to delete');
          setSnackOpen(true);
          setTimeout(() => setSnackOpen(false), 1000);
        }
      })
      .catch(error => {
        console.log(error)
        setMsg('Something went Strong');
        setSnackOpen(true);
        setTimeout(() => setSnackOpen(false), 1000);
      })
  }

  return (
    <div className={classes.main_body}>
      <div className={classes.notes_body}>
        <div className={classes.notes_label_area}>
          <div className={classes.newNotesContainer}>
            <Button style={{ textTransform: 'capitalize' }} size="small" color="primary" variant="contained"
              onClick={handleNewNotebookDialogBox}>New Notebook</Button>
          </div>
          <Dialog open={openNotebookDialog} onClose={handleCloseNotebookDialogBox} aria-labelledby="form-dialog-title">
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="newnote"
                label="New Notebook title..."
                value={notebookTitle}
                onChange={(e) => setNotebookTitle(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addNewNotebook} color="primary">Submit</Button>
            </DialogActions>
          </Dialog>
          <div className={classes.noteLabelListSec}>
            <ul className={classes.noteLabelLists}>
              {notebookList && notebookList.length > 0 ?
                notebookList.map(notebook => (
                  <li className={classes.noteLabelItem} key={notebook._id}
                    onClick={() => selectNotebook(notebook.notebookid)}
                  >
                    <span style={{ color: '#fff' }}>
                      <EditIcon fontSize="small"
                        onClick={() => {
                          // edit notebook title
                          setEditNotebook(notebook);
                          setNotebookTitle(notebook.title);
                          setOpenNotebookDialog(true);
                        }}
                      ></EditIcon>
                      <DeleteIcon fontSize="small"
                        onClick={() => deleteNotebook(notebook.notebookid)} />
                    </span>
                    <span className={classes.notelabel}>{notebook.title}</span>
                  </li>
                )) :
                <span className={classes.notelabel}>No Notebook find</span>
              }
            </ul>
          </div>
        </div>
        <div className={classes.notes_list_area}>
          <div className={classes.newNotesContainer}>
            <Button style={{ textTransform: 'capitalize' }} size="small" color="primary"
              variant="contained"
              onClick={() => {
                // add new note
                if (!newNoteBool) {
                  setNoteData({});
                  setNewNoteBool(true);
                  setCurrNoteId(null);
                }
              }}>New Note</Button>
          </div>
          <div className={classes.notesListContainer}>
            <ul className={classes.notesPreviewLists}>
              {notesList && notesList.length > 0 ?
                notesList.map(note => (
                  <li className={classes.notesPreviewItem} key={note.noteid}
                    onClick={() => {
                      // note details
                      setNoteData({
                        noteid: note.noteid,
                        title: note.title,
                        subtitle: note.subtitle,
                        description: note.description
                      });
                      setCurrNoteId(note.noteid);
                    }}
                  >
                    <div className={classes.notesPreview}>
                      <p className={classes.title}>{note.title}</p>
                      <p className={classes.desc}>{note.subtitle}</p>
                    </div>
                  </li>
                )) :
                <p className={classes.title}>No Note Found</p>
              }
            </ul>
          </div>
        </div>
        <div className={classes.notes_view_area}>
          <div className={classes.actionContainer}>
            <TextField style={{ width: '100%' }}
              onChange={handleInputChange}
              name='title'
              value={noteData ? noteData.title : ''}
              inputProps={{ className: classes.inputNote }}
              variant="filled"
              placeholder="Note Title..."
              fontFamily="Monospace" />

            <Button style={{ textTransform: 'capitalize' }}
              size="small" color="primary"
              onClick={saveNewNote}
              variant="contained">Save</Button>

            <Button style={{
              textTransform: 'capitalize',
              margin: '0 0.5rem'
            }} size="small" color="secondary" variant="contained"
              onClick={deleteNote} >Delete</Button>

          </div>
          <div className={classes.titleInputContainer}>
            <TextField style={{ width: '100%' }}
              name='subtitle'
              onChange={handleInputChange}
              value={noteData.subtitle}
              inputProps={{ className: classes.inputSubtitle }}
              variant="filled"
              placeholder="Note Subtitle..." />
          </div>
          <div className={classes.descInputContainer}>
            <textarea
              name='description'
              onChange={handleInputChange}
              className={classes.textarea}
              placeholder="Enter description here..."
              value={noteData ? noteData.title : ''}>
            </textarea>
          </div>
        </div>
      </div >
      {/* snack bar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        message={msg}
        autoHideDuration={6000}
      />
    </div >
  )
}

const useStyles = makeStyles(theme => ({
  main_body: {
    height: '100vh'
  },
  notes_body: {
    display: 'grid',
    height: '100%',
    gridTemplateColumns: '12rem 18rem auto',
    backgroundColor: '#0F0F0F'
  },
  notes_label_area: {
    backgroundColor: '#212121'
  },
  notes_list_area: {
    backgroundColor: '#121212'
  },
  notes_view_area: {
    display: 'grid',
    gridTemplateRows: '3rem 5rem auto'
  },
  newNotesContainer: {
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  noteLabelListSec: {
    padding: '0.5rem 0'
  },
  noteLabelLists: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  noteLabelItem: {
    padding: '0.5rem 0 0.5rem 0.6rem',
    borderBottom: '1px solid #282828'
  },
  notelabel: {
    color: '#1aa4e8',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: '#1a88f8'
    }
  },
  notesListContainer: {},
  notesPreviewLists: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  notesPreviewItem: {
    padding: '0.5rem',
    borderBottom: '1px solid #555'
  },
  notesPreview: {
    cursor: 'pointer'
  },
  actionContainer: {
    display: "flex",
    justifyContent: 'end',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: 0
  },
  desc: {
    color: '#bbb',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: 0,
    fontSize: '12px'
  },
  inputNote: {
    color: '#fff',
    fontSize: '30px'
  },
  inputSubtitle: {
    width: '100%',
    color: '#bbb',
  },
  descInputContainer: {
    overflow: 'hidden',
    height: '100%',
  },
  textarea: {
    color: '#fff',
    width: "100%",
    height: '100%',
    backgroundColor: 'transparent',
    border: '1px solid #555',
    margin: '0rem 0rem',
    fontSize: '15px',
    opacity: 0.8,
    padding: '15px'
  }
}))

export default Notes;
