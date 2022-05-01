import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";

import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

import { ref } from "../Firebasedb";

export default function Notes() {
  // console.log(ref);
  const [notes, setNotes] = React.useState([]);

  const [loader, setLoader] = React.useState(true);


  function getNotes() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setNotes(items);
      setLoader(false);
    });
  }

  React.useEffect(() => {
    getNotes();
    // console.log(data)
  }, []);

  const handleDelete = async (id) => {

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

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {loader === false &&
          notes.map((note) => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
              {/* <NoteCard note={note} handleDelete={() => handleDelete(note.id)}/> */}
            </div>
          ))}
      </Masonry>
    </Container>
  );
}
