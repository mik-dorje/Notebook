import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import {
  Avatar,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import "./EditCard.css";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function EditCard({ note, handleUpdate, handleCancel }) {
  const [editTitle, setEditTitle] = React.useState(note.title);
  const [editDetails, setEditDetails] = React.useState(note.details);
  const [editCategory, setEditCategory] = React.useState(note.category);

  const [editAvatar, setEditAvatar] = React.useState(false);

  const [editTitleError, setEditTitleError] = React.useState(false);
  const [editDetailsError, setEditDetailsError] = React.useState(false);

  const categories = ["Event", "Todo", "Reminder", "Message"];

  return (
    <div
      className={`edit-card
        ${
          editCategory == "Event"
            ? "eventEdit"
            : "" || editCategory == "Todo"
            ? "todoEdit"
            : "" || editCategory == "Reminder"
            ? "reminderEdit"
            : "" || editCategory == "Message"
            ? "messageEdit"
            : ""
        }`}
    >
      <div className="card-top">
        <Avatar
          className={
            (editCategory == "Event" && "eventEditAvatar") ||
            (editCategory == "Todo" && "todoEditAvatar") ||
            (editCategory == "Reminder" && "reminderEditAvatar") ||
            (editCategory == "Message" && "messageEditAvatar")
          }
          onClick={() => {
            setEditAvatar(!editAvatar);
          }}
        >
          <div className="cat-arrow">
            {editCategory[0].toUpperCase()}
            <ArrowRightIcon sx={{ fontSize: 28 }} />
          </div>
        </Avatar>

        {editAvatar && (
          <div className="other-categories">
            {categories.map((category) => {
              if (category != editCategory)
                return (
                  <Avatar
                    className={`edit-avatar ${
                      (category == "Event" && "eventAvatar") ||
                      (category == "Todo" && "todoAvatar") ||
                      (category == "Reminder" && "reminderAvatar") ||
                      (category == "Message" && "messageAvatar")
                    }`}
                    onClick={() => {
                      setEditCategory(category);
                      setEditAvatar(!editAvatar);
                    }}
                  >
                    {category[0].toUpperCase()}
                  </Avatar>
                );
            })}
          </div>
        )}

        <div className="card-title">
          <TextField
            className="field"
            onChange={(event) => setEditTitle(event.target.value)}
            label="Title"
            value={editTitle}
            variant="outlined"
            inputProps={{
              style: {
                fontSize: 14,
                color: "#4c4c4c",
                padding: 5,
                fontFamily: "Quicksand",
              },
            }}
            InputLabelProps={{
              style: { color: "#5e5e5e", fontSize: "13px" },
            }}
            fullWidth
            size="small"
            color="textSecondary"
            required
            error={editTitleError}
          />
        </div>

        <div className="update-close-btns">
          <div>
            <Tooltip title="Done">
              <IconButton
                className="icon-btn"
                size="small"
                color="primary"
                onClick={() =>
                  handleUpdate(
                    note.id,
                    editTitle,
                    editDetails,
                    editCategory,
                    setEditTitleError,
                    setEditDetailsError
                  )
                }
              >
                <DoneIcon sx={{ fontSize: 28 }} color="secondary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel">
              <IconButton
                className="icon-btn"
                size="small"
                color="primary"
                onClick={handleCancel}
              >
                <CloseIcon sx={{ fontSize: 28 }} color="secondary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <Divider />

      <div className="card-bottom">
        <TextField
          className="field"
          onChange={(event) => setEditDetails(event.target.value)}
          label="Description"
          value={editDetails}
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 14,
              color: "#4c4c4c",
              padding: 2,
              textAlign: "justify",
              fontFamily: "Quicksand",
            },
          }}
          InputLabelProps={{
            style: { color: "#5e5e5e" },
          }}
          size="small"
          fullWidth
          required
          multiline
          error={editDetailsError}
        />
      </div>
    </div>
  );
}
