import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import "./create.css";
import "./base.css"

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();
  

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newHabit = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHabit),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ title: "", action: "", location: "", time: "" });
    navigate("/");
  }

  function clearFields() {
    setForm({ title: "", action: "", location: "", time: "" });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <Typography sx={{paddingTop: "5px"}} variant="h5" color="text.secondary">
          Create a new Habit
        </Typography>
      <FormControl onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="title"
            label="Title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="action"
            label="Action"
            value={form.action}
            onChange={(e) => updateForm({ action: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="location"
            label="Location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="time"
            label="Time"
            value={form.time}
            onChange={(e) => updateForm({ time: e.target.value })}
            />
        </div>
        <div className="form-group buttons">
          <Button
            variant="outlined"
            className="btn btn-primary"
            onClick={clearFields}
          > Clear Fields </Button>
          <Button
            variant="outlined"
            className="btn btn-primary"
            onClick={onSubmit}
          > Create Habit </Button>
        </div>
      </FormControl>
    </div>
  );
}