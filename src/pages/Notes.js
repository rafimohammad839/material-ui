import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    console.log("Id is", id);
    const response = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setNotes((notes) => {
        return notes.filter((note) => {
          return note.id != id;
        });
      });
    } else {
      console.log("Some error occurred...");
    }
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
