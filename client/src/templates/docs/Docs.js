import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import AddDocDialog from "./addCred";
import "./docs.css";

const useStyles = makeStyles((theme) => ({
  docCont: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
    margin: "10px",
  },
  root: {
    width: "90%",
  },
  fab: {},
  expand: {
    width: "90%",
  },
}));

export default function Docs() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [openAddDocDialog, setAddDocDialogOpen] = useState(false);

  const handleAddDocClickOpen = () => {
    setAddDocDialogOpen(true);
  };
  const handleAddDocClose = () => {
    setAddDocDialogOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.docCont}>
        <form onSubmit={handleExpandClick}>
          <input
            id="standard-search"
            placeholder="Search"
            label="Search field"
            type="search"
            style={{
              borderColor: "#183D5Ddd",
              borderRadius: "19px",
              margin: "10px",
              paddingBlock: "10px",
              paddingInline: "50px",
              color: "#183D5D",
            }}
          ></input>
        </form>
        <Tooltip title="Add Doc" aria-label="add">
          <Fab
            color="primary"
            className={classes.fab}
            onClick={handleAddDocClickOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <ul>
        <li className={classes.docCont}>
          <Card
            className={classes.root}
            style={{ backgroundColor: "transparent" }}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <ExpandMoreIcon />
                </IconButton>
              }
              style={{ backgroundColor: "#0066cc" }}
              title="import CardHeader from '@material-ui/core/CardHeader';"
              subheader={
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    backgroundColor: "#183d5d",
                    width: "min-content",
                    paddingInline: "6px",
                    borderRadius: "6px",
                  }}
                >
                  #hastag
                </Typography>
              }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent
                style={{
                  background: "#0066CCaa",
                  cursor: "auto",
                  borderRadius: "15px",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    borderRadius: "6px",
                  }}
                >
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </li>
      </ul>
      <Dialog
        open={openAddDocDialog}
        maxWidth={"lg"}
        fullWidth={true}
        onClose={handleAddDocClose}
        aria-labelledby="form-dialog-title"
      >
        <AddDocDialog />
      </Dialog>
    </div>
  );
}
