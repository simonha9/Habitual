import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FormControl, TextField } from "@mui/material";
import "./edit.css";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedHabit = {
      title: form.title,
      action: form.action,
      location: form.location,
      time: form.time
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedHabit),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Habit</h3>
      <br/>
      <FormControl onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="title"
            label="Title"
            value={form.title || ''}
            onChange={(e) => updateForm({ title: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="action"
            label="Action"
            value={form.action || ''}
            onChange={(e) => updateForm({ action: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="location"
            label="Location"
            value={form.location || ''}
            onChange={(e) => updateForm({ location: e.target.value })}
            />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            id="time"
            label="Time"
            value={form.time || ''}
            onChange={(e) => updateForm({ time: e.target.value })}
            />
        </div>

      </FormControl>
      <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
            onClick={onSubmit}
          />
        </div>
    </div>
  );
}