import React from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Toolbar,
} from "@mui/material";

import { useHistory } from "react-router-dom";

import "./Create.css";

import { nanoid } from "nanoid";
import format from "date-fns/format";

import { db } from "../Firebasedb";

import { auth } from "../FirebaseAuth";

import { onAuthStateChanged } from "firebase/auth";

export default function Create() {
  const history = useHistory();

  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [titleError, setTitleError] = React.useState(false);
  const [detailsError, setDetailsError] = React.useState(false);

  const [category, setCategory] = React.useState("Todo");

  const [user, setUser] = React.useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      // console.log(user?.email)
      const email = user?.email;
      const uid = user?.uid;
      const date = format(new Date(), "dd/MM/yyyy hh:mm bbb");

      const id = nanoid();

      db.collection("Privatebook")
        .doc(id)
        // .set({ id, title, details, category, date }, {merge: true})
        .set({ uid, id, email, title, details, category, date })

        .catch((err) => {
          alert(err);
          console.error(err);
        })
        .then(() => history.push("/notebook"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        // gutterBottom
        color="textSecondary"
      >
        CREATE A NOTE
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          // sx={{marginTop: 1}}
          margin="normal"
          // className={classes.field}
          className="field"
          onChange={(event) => setTitle(event.target.value)}
          label="Title"
          variant="outlined"
          // size="small"
          // color="secondary"
          fullWidth
          required
          error={titleError}
          InputLabelProps={
            {
              style: {color: '#5e5e5e'}
            }
          }
        />

        <TextField
          // sx={{marginTop: 2, marginBottom: 2}}
          margin="normal"
          // className={classes.field}
          onChange={(event) => setDetails(event.target.value)}
          label="Description"
          variant="outlined"
          // color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          InputLabelProps={
            {
              style: {color: '#5e5e5e'}
            }
          }
        />
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          sx={{ paddingTop: "8px" }}
        >
          CATEGORY:
        </Typography>

        <div sx={{ paddingLeft: "0px" }}>
          <FormControl>
            {/* <FormLabel>Note Category</FormLabel> */}
            <RadioGroup
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              
              <FormControlLabel
                value="Event"
                control={<Radio color="secondary" />}
                label="Event"
              />
              <FormControlLabel
                value="Todo"
                control={<Radio color="secondary" />}
                label="Todo"
              />
              <FormControlLabel
                value="Reminder"
                control={<Radio color="secondary" />}
                label="Reminder"
              />
              <FormControlLabel
                value="Message"
                control={<Radio color="secondary" />}
                label="Message"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <button className="bigbutton">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>
            <strong>Create</strong>
          </span>
        </button>

      </form>
    </Container>
  );
}
