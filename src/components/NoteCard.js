import React from "react";

import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Avatar, Divider, IconButton } from "@mui/material";
import { blue, green, pink, yellow, purple } from "@mui/material/colors";

import { makeStyles } from "@material-ui/styles";

import "./NoteCard.css";

//since makeStyles is not working, the conditional color styling is implemented inside using sx
const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return yellow[700];
      }
      if (note.category == "money") {
        return green[500];
      }
      if (note.category == "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  return (
    <div className="card-box">
      <Card
       style={{borderRadius: '10px'}}
        className={`card 
        ${
          note.category == "Event" ? "eventCard" : ""
          || note.category == "Todo" ? "todoCard" : ""
          || note.category == "Remainder" ? "remainderCard" : ""
          || note.category == "Message" ? "messageCard" : "" 
          }`}

        elevation={3}
      >
        <CardHeader
          avatar={
            <Avatar
              className={
                (note.category == "Event" && "eventAvatar") ||
                (note.category == "Todo" && "todoAvatar") ||
                (note.category == "Remainder" && "remainderAvatar") ||
                (note.category == "Message" && "messageAvatar")
              }

              
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton color="primary" onClick={() => handleDelete(note.id)}>
              <DeleteForeverIcon sx={{ fontSize: 28 }} color="secondary" />
            </IconButton>
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
