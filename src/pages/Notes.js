import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

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

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
