import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import apiClient from "../../../common/services/apiClient";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
export default function FlightSearchForm({ onSearch }) {
  const [options, setOptions] = useState([]);
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");

  // load airport options on mount
  useEffect(() => {
    apiClient
      .get("/airports/options")
      .then((res) => setOptions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      sourceAirport: source,
      destinationAirport: dest,
      bookingDate: date,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        select
        label="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Destination"
        value={dest}
        onChange={(e) => setDest(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

       <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button
        type="submit"
        variant="contained"
        sx={{ minWidth: 150, mt: { xs: 2, sm: 0 } }}
      >
        Search Flights
      </Button>
    </Box>
  );
}
