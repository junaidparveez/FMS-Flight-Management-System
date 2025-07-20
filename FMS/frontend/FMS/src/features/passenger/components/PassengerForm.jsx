import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createPassenger } from '../services/passengerService';

export default function PassengerForm({ onSuccess = () => {}, submitLabel = 'Save' }) {
  const [passenger, setPassenger] = useState({
    passengerId:'',
    firstName: '',
    lastName: '',
    emailId: '',
    passportNumber: ''
  });

  const passengerMutation = useMutation({ mutationFn: createPassenger });

  const handlePassengerChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handlePassengerSubmit = async () => {
    try {
      const saved = await passengerMutation.mutateAsync(passenger);
      onSuccess(saved); // Pass saved passenger back to parent
    } catch (err) {
      // Log the full error object for debugging
      console.error('Failed to save passenger', err);
      let message = 'Failed to save passenger.';
      if (err?.response?.data?.message) {
        message += `\n${err.response.data.message}`;
      } else if (err?.message) {
        message += `\n${err.message}`;
      } else if (typeof err === 'string') {
        message += `\n${err}`;
      }
      alert(message);
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight={600} mb={2}>Step 1: Passenger Details</Typography>
      <Stack spacing={2} my={2} sx={{ maxWidth: 500 }}>
        {['firstName','lastName','emailId','passportNumber'].map(field => (
          <TextField
            key={field}
            name={field}
            label={field.replace(/([A-Z])/g, ' $1')}
            value={passenger[field]}
            onChange={handlePassengerChange}
            fullWidth
            sx={{ bgcolor: '#fafafa', borderRadius: 1 }}
          />
        ))}
        <Button
          variant="contained"
          onClick={handlePassengerSubmit}
          disabled={passengerMutation.isLoading}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          {passengerMutation.isLoading ? 'Saving…' : submitLabel}
        </Button>
      </Stack>
    </>
  );
}
