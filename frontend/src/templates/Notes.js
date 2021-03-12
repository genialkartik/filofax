import {
  makeStyles,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  main_body:{
    height: '100vh'
  },
  notes_body:{
    display: 'grid',
    height: '100%',
    gridTemplateColumns: '8rem 12rem auto',
    backgroundColor: '#0F0F0F'
  },
  notes_label_area:{
    backgroundColor: '#212121'
  },
  notes_list_area:{
    backgroundColor: '#121212'
  },
  notes_view_area:{
    display: 'grid',
    gridTemplateRows: '3rem 8rem auto'
  },
  newNotesContainer:{
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #555'
  },
  noteLabelListSec:{
    padding: '0.5rem 0'
  },
  noteLabelLists:{
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  noteLabelItem:{
    padding: '0.5rem 0 0.5rem 0.6rem',
    borderBottom: '1px solid #363636'
  },
  notelabel:{
    color: '#1aa4e8',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover':{
      color: '#1a88f8'
    }
  },
  notesListContainer:{},
  notesPreviewLists:{
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  notesPreviewItem:{
    padding: '0.5rem',
    borderBottom: '1px solid #555'
  },
  notesPreview:{
    cursor:'pointer'
  },
  actionContainer:{
    display:"flex",
    justifyContent:'end',
    alignItems:'center'
  },
  title:{
    color:'#fff',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: 0
  },
  desc:{
    color: '#bbb',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: 0,
    fontSize: '14px'
  },
  input:{
    width: '100%',
    color: '#fff',
    borderBottomColor: '#fff'
  },
  descInputContainer:{
    overflow: 'hidden',
    height: '100%'
  },
  textarea: {
    color: '#fff',
    width:"100%",
    height: '100%',
    backgroundColor:'transparent',
    border: 'none',
    padding: '1rem 0.7rem',
    fontSize: '15px',
    opacity: 0.7
  }
}))

function Notes() {
  const classes = useStyles();
  return(
    <div className={classes.main_body}>
      <div className={classes.notes_body}>
        <div className={classes.notes_label_area}>
          <div className={classes.newNotesContainer}>
            <Button style={{textTransform: 'capitalize'}} size="small" color="primary" variant="contained">New Notebook</Button>
          </div>
          <div className={classes.noteLabelListSec}>
            <ul className={classes.noteLabelLists}>
              <li className={classes.noteLabelItem}>
                <span href="#" className={classes.notelabel}>Class</span>
              </li>
              <li className={classes.noteLabelItem}>
                <span href="#" className={classes.notelabel}>Meeting Area Code</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.notes_list_area}>
          <div className={classes.newNotesContainer}>
            <Button style={{textTransform: 'capitalize'}} size="small" color="primary" variant="contained">New Note</Button>
          </div>
          <div className={classes.notesListContainer}>
            <ul className={classes.notesPreviewLists}>
              <li className={classes.notesPreviewItem}>
                <div className={classes.notesPreview}>
                  <p className={classes.title}>
                    This is the title of the preview.
                  </p>
                  <p className={classes.desc}>
                    This is area of description of preview.
                  </p>
                </div>
              </li>
              <li className={classes.notesPreviewItem}>
                <div href="javascript:void(0);" className={classes.notesPreview}>
                  <p className={classes.title}>
                    This is the title of the preview.
                  </p>
                  <p className={classes.desc}>
                    This is area of description of preview.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.notes_view_area}>
          <div className={classes.actionContainer}>
            <Button style={{textTransform: 'capitalize'}} size="small" color="primary" variant="contained">Save</Button>
            <Button style={{
              textTransform: 'capitalize',
              margin: '0 0.5rem'
            }} size="small" color="primary" variant="contained">Cancel</Button>
          </div>
          <div className={classes.titleInputContainer}>
            <TextField style={{width: '100%'}} inputProps={{
              className: classes.input
            }} variant="filled" placeholder="Enter title here..." />
            <TextField style={{width: '100%'}} inputProps={{
              className: classes.input
            }} variant="filled" placeholder="Enter subtitle here..." />
          </div>
          <div className={classes.descInputContainer}>
            <textarea className={classes.textarea} placeholder="Enter description here..."></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Notes;
