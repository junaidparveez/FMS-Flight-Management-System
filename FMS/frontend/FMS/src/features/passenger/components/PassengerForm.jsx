import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createPassenger } from '../services/passengerService';

export default function PassengerForm({ onSuccess }) {
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
      alert('Failed to save passenger');
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
          {passengerMutation.isLoading ? 'Saving…' : 'Next'}
        </Button>
      </Stack>
    </>
  );
}
