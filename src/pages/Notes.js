import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

import { db, ref } from "../Firebasedb";
import { auth } from "../FirebaseAuth";

import "./Notes.css";

import empty from "../images/empty.svg";
import EditCard from "../components/EditCard";
import { format } from "date-fns";

export default function Notes() {
  // console.log(ref);
  const [notes, setNotes] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [editOnId, setEditOnId] = React.useState(null);

 
  function getNotes() {
    db.collection("Privatebook").onSnapshot((querySnapshot) => {
      // console.log(querySnapshot)
      const items = [];
      querySnapshot.forEach((doc) => {
        const uid = auth?.currentUser?.uid;

        // console.log(uid)
        // console.log(doc._delegate._document.data.value.mapValue.fields.uid.stringValue)

        if (
          auth?.currentUser?.uid ==
          doc._delegate._document.data.value.mapValue.fields.uid.stringValue
        ) {
          // console.log("logged-in email matched");
          // console.log(doc.data());
          items.push(doc.data());
        }
      });
      setNotes(items);
      setLoader(false);
    });
  }

  React.useEffect(() => {
    getNotes();
  }, []);
  // console.log(notes);

  const handleDelete = async (id) => {
    console.log(id);
    ref
      .doc(id)
      .delete()
      .catch((err) => {
        alert(err);
        console.error(err);
      });

    // const newNotes = data.filter((note) => note.id != id);
    // setdata(newNotes);
    //not needed as getNotes() is called runs automatically after change in firebase database
  };

  const handleEdit = async (id) => {
    // if (editOnId == id) {
    //   setEditOnId(null)
    //   return
    // }
    // setEditOnId(id)

    editOnId == id ? setEditOnId(null) : setEditOnId(id);
  };

  const handleUpdate = async (id, title, details, category, setEditTitleError, setEditDetailsError) => {
    setEditTitleError(false);
    setEditDetailsError(false);
    if (title == "") {
      setEditTitleError(true);
    }
    if (details == "") {
      setEditDetailsError(true);
    }

    if (title && details) {
      const email = auth?.currentUser?.email;
      const uid = auth?.currentUser?.uid;
      const date = format(new Date(), "dd/MM/yyyy hh:mmbbb");

      db.collection("Privatebook")

        .doc(id)
        .set({ uid, id, email, title, details, category, date })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
      // .then(() => history.push("/notebook"));

      // console.log("Data updated successfully")
      setEditOnId(null);
    }
  };

  const handleCancel = async (id) => {
    setEditOnId(null);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    // if notes is empty show empty-page else so grid-masonry of notes
    <Container>
      {notes == "" ? (
        <div className="empty">
          <div className="image">
            <img src={empty} alt="empty" />
          </div>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {loader === false &&
            notes.map((note) => (
              <div key={note.id}>
                {/* <NoteCard
                  className="noteCard"
                  note={note}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />

                {editOnId == note.id && (
                  <EditCard
                    className="editCard"
                    note={note}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                  />
                )} */}

                {editOnId == note.id ? (
                  <EditCard
                    className="editCard"
                    note={note}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                  />
                ) : (
                  <NoteCard
                    className="noteCard"
                    note={note}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            ))}
        </Masonry>
      )}
    </Container>
  );
}
