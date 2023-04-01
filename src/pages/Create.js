import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControlLabel,
  TextField,
  Container,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  field: {
    marginTop: "20px !important",
    marginBottom: "20px !important",
    display: 'block !important'
  },
})

const Create = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('')
  const [isTitleError, setIsTitleError] = useState(false)
  const [isDetailsError, setIsDetailsError] = useState(false)
  const [category, setCategory] = useState('todos');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTitleError(false);
    setIsDetailsError(false);

    if (!title) {
      setIsTitleError(true);
    } 
    if (!details) {
      setIsDetailsError(true);
    } 

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          details,
          category
        })
      }).then(() => navigate('/'))
    }
    
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create A New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          id="outline-basic"
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={isTitleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          id="outline-basic"
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows="4"
          error={isDetailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel color="secondary">Note Category</FormLabel>
          <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="secondary" />} label="Money" />
            <FormControlLabel value="todos" control={<Radio color="secondary" />} label="Todos" />
            <FormControlLabel value="reminder" control={<Radio color="secondary" />} label="Reminder" />
            <FormControlLabel value="work" control={<Radio color="secondary" />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
        </form>
    </Container>
  );
};

export default Create;
