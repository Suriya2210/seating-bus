import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SeatRow = () => {
  const [rows, setRows] = useState([{ seat_number: '', associate: '', date: null }]);

  const handleAddRow = () => {
    setRows([...rows, { seat_number: '', associate: '', date: null }]);
  };

  const handleSeatNumberChange = (index, event) => {
    const newRows = [...rows];
    newRows[index].seat_number = event.target.value;
    setRows(newRows);
  };

  const handleAssociateChange = (index, event) => {
    const newRows = [...rows];
    newRows[index].associate = event.target.value;
    setRows(newRows);
  };

  const handleDateChange = (index, newDate) => {
    const newRows = [...rows];
    newRows[index].date = newDate;
    setRows(newRows);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="Seat Number"
              value={row.seat_number}
              onChange={(event) => handleSeatNumberChange(index, event)}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id={`associate-label-${index}`}>Associate</InputLabel>
              <Select
                labelId={`associate-label-${index}`}
                value={row.associate}
                onChange={(event) => handleAssociateChange(index, event)}
                fullWidth
              >
                {/* Your options for associate */}
                <MenuItem value="Associate 1">Associate 1</MenuItem>
                <MenuItem value="Associate 2">Associate 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
    
        <DatePicker label="From date" />
        <DatePicker label="To date" />
      
    </LocalizationProvider>  
          </Grid>
          <Grid item xs={12}>
            {index === rows.length - 1 && (
              <Button variant="contained" color="primary" onClick={handleAddRow}>
                Add Row
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default SeatRow;
