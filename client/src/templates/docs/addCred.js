import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddDocDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Query"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="atleast 3 hastags (comma ',' separated)"
          type="text"
          fullWidth
        />
        <TextField
          style={{ marginBlock: 30, color: "#fff" }}
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Enter Definition"
          multiline
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
}
