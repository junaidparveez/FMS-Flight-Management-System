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
  Stack,
  MenuItem,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState({
    paymentMethod: "CARD",
    amount: "",
  });

  useEffect(() => {
    if (!open) {
      setPassenger({ firstName: "", lastName: "", emailId: "", passportNumber: "" });
      setError(null);
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleClose = () => {
    setPassenger({ firstName: "", lastName: "", emailId: "", passportNumber: "" });
    setPayment({ paymentMethod: "CARD", amount: "" });
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedFlight) return;

    // Basic validations
    const { firstName, lastName, emailId, passportNumber } = passenger;
    const { paymentMethod, amount } = payment;
    if (!firstName || !lastName || !emailId || !passportNumber || !paymentMethod || !amount) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    // setSubmitting(true);
    setError(null);

    const payload = {
      flightId: selectedFlight.flightID,
      passenger: { ...passenger },
      payment: {
        ...payment,
        transactionDateTime: new Date().toISOString(),
      },
    };
    try {
      await apiClient.post("/bookings", payload);
      onComplete(); // refresh booking list
    } catch (err) {
      console.error(err);
      setError("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Book Flight {selectedFlight?.flightNumber}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            name="firstName"
            value={passenger.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={passenger.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="emailId"
            type="email"
            value={passenger.emailId}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Passport Number"
            name="passportNumber"
            value={passenger.passportNumber}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Payment Method"
            name="paymentMethod"
            value={payment.paymentMethod}
            onChange={handlePaymentChange}
            select
            fullWidth
          >
            <MenuItem value="CARD">Card</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="CASH">Cash</MenuItem>
          </TextField>

          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={payment.amount}
            onChange={handlePaymentChange}
            fullWidth
          />

          {error && <div style={{ color: "red" }}>{error}</div>}
        </Stack>
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
