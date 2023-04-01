import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { yellow, green, pink, blue } from '@mui/material/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == 'work') {
        return "yellow !important"
      }
      if (note.category == 'money') {
        return green[500]
      }
      if (note.category == 'reminders') {
        return pink[700]
      }
      return blue[500]
    }
  }
})

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                backgroundColor:
                  note.category == "work"
                    ? yellow[500]
                    : note.category == "money"
                    ? green[700]
                    : note.category == "todos"
                    ? pink[500]
                    : blue[600],
              }}
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard