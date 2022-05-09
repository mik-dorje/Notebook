import React from "react";

import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { Avatar, Divider, IconButton, Tooltip } from "@mui/material";
import "./NoteCard.css";

export default function NoteCard({ note, handleDelete, handleEdit }) {
  return (
    <div className="card-box">
      <Card
        style={{ borderRadius: "10px" }}
        className={`card 
        ${
          note.category == "Event"
            ? "eventCard"
            : "" || note.category == "Todo"
            ? "todoCard"
            : "" || note.category == "Reminder"
            ? "reminderCard"
            : "" || note.category == "Message"
            ? "messageCard"
            : ""
        }`}
        elevation={3}
      >
        <CardHeader
          avatar={
            <Avatar
              className={
                (note.category == "Event" && "eventAvatar") ||
                (note.category == "Todo" && "todoAvatar") ||
                (note.category == "Reminder" && "reminderAvatar") ||
                (note.category == "Message" && "messageAvatar")
              }
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <Tooltip title="Edit">
                <IconButton
                  className="icon-btn"
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(note.id)}
                >
                  <DriveFileRenameOutlineIcon
                    sx={{ fontSize: 28 }}
                    color="secondary"
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  className="icon-btn"
                  size="small"
                  color="primary"
                  onClick={() => handleDelete(note.id)}
                >
                  <DeleteForeverIcon sx={{ fontSize: 28 }} color="secondary" />
                </IconButton>
              </Tooltip>
            </div>
          }
          title={note.title.toUpperCase()}
          subheader={note.category}
        />
        <Divider />
        <CardContent>
          <Typography style={{ fontSize: "0.8rem", color: "blueviolet" }}>
            {note.date}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ textAlign: "justify" }}
          >
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
