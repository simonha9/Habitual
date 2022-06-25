import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';
import "./recordList.css"
import { useNavigate } from "react-router-dom"

const Record = (props) => (
  <TableRow 
    key={props.record.title}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    <TableCell component="th" scope="row">{props.record.title}</TableCell>
    <TableCell aligh="right">{props.record.action}</TableCell>
    <TableCell aligh="right">{props.record.location}</TableCell>
    <TableCell aligh="right">{props.record.time}</TableCell>
    <TableCell aligh="right">
      <EditIcon className="icon" onClick={() => {
        props.routeChange(`/edit/${props.record._id}`)
      }}/>
      <DeleteIcon
        className="icon"
         onClick={() => {
           props.deleteRecord(props.record._id);
         }}
       >
     </DeleteIcon>  
    </TableCell>
  </TableRow>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          routeChange={(path) => routeChange(path)}
        />
      );
    });
  }

  function routeChange(path) {
    navigate(path);
  }

  const tableHeader = [
    "Title",
    "Action",
    "Location",
    "Time"
  ];

  // This following section will display the table with the records of individuals.
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Habits Table">
        <TableHead>
          <TableRow>
            {tableHeader.map((h) => (
              <TableCell key={h} sx={{ 'fontWeight': 'bold' }}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{recordList()}</TableBody>
      </Table>

    </TableContainer>
  );
}