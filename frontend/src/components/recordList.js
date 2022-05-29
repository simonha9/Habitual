import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

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
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
         onClick={() => {
           props.deleteRecord(props.record._id);
         }}
       >
         Delete
     </button>  
    </TableCell>
  </TableRow>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

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
        />
      );
    });
  }

  const tableHeader = [
    "Title",
    "Action",
    "Location",
    "Time",
    "Edit"
  ];

  // This following section will display the table with the records of individuals.
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Habits Table">
        <TableHead>
          <TableRow>
            {tableHeader.map((h) => (
              <TableCell sx={{ 'font-weight': 'bold' }}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{recordList()}</TableBody>
      </Table>

    </TableContainer>
  );
}