import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import apiClient from "../../../common/services/apiClient";

const BookingForm = ({ open, selectedFlight, onClose, onComplete }) => {
  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    passportNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setPassenger({ firstName: "", lastName: "", emailId: "", passportNumber: "" });
      setError(null);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // basic validation
    const { firstName, lastName, emailId, passportNumber } = passenger;
    if (!firstName || !lastName || !emailId || !passportNumber) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      // 1) create passenger
      const passengerRes = await apiClient.post("/passengers", passenger);
      const newPassenger = passengerRes.data;

      // 2) create booking
      const bookingPayload = {
        flightId: selectedFlight.flightID,
        passengerId: newPassenger.passengerId,
      };
      await apiClient.post("/bookings", bookingPayload);

      // notify parent to refresh and close
      onComplete();
    } catch (err) {
      console.error(err);
      setError("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Book Flight {selectedFlight?.flightNumber}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={passenger.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={passenger.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email ID"
              name="emailId"
              type="email"
              value={passenger.emailId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Passport Number"
              name="passportNumber"
              value={passenger.passportNumber}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={20} /> : null}
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookingForm.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedFlight: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default BookingForm;
