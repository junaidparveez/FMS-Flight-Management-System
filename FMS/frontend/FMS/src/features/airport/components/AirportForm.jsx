// src/features/flights/components/FlightForm.jsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAirports,
  createAirport,
  updateAirport  
} from '../services/airportService';

const AirportForm = ({ open, onClose, initialAirport }) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(initialAirport);

  // ✅ Updated to object syntax
  const { data: airports = [] } = useQuery({
    queryKey: ['airports'],
    queryFn: fetchAirports,
  });

  // ✅ createAirport mutation
  const createMutation = useMutation({
    mutationFn: createAirport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      onClose();
    },
  });

  // ✅ updateAirport mutation
  const updateMutation = useMutation({
    mutationFn: updateAirport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      airportCode: initialAirport?.airportCode || '',
      airportName: initialAirport?.airportName || '',
      location: initialAirport?.location || '',
      facility: initialAirport?.facility || ''
    },
    validationSchema: Yup.object({
      // airportCode: Yup.number().required('Required'),
      airportName: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      facility: Yup.string().required('Required'),
      
    }),
    onSubmit: (values) => {
      if (isEdit) {
        updateMutation.mutate({ id: initialAirport.airportCode, ...values });
      } else {
        createMutation.mutate(values);
      }
    },
  });

  useEffect(() => {
    if (initialAirport) {
      formik.resetForm({ values: initialAirport });
    } else {
      formik.resetForm();
    }
  }, [initialAirport, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Airport' : 'Create Airport'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* All your TextFields and selects as before */}
          {/* <TextField
            fullWidth
            label="Airport Code"
            name="airportCode"
            value={formik.values.airportCode}
            onChange={formik.handleChange}
            error={formik.touched.airportCode && Boolean(formik.errors.airportCode)}
            helperText={formik.touched.airportCode && formik.errors.airportCode}
          /> */}
          {/* ... other fields ... */}
          
          <TextField
            // select
            fullWidth
            label="Airport Name"
            name="airportName"
            value={formik.values.airportName}
            onChange={formik.handleChange}
            error={formik.touched.airportName && Boolean(formik.errors.airportName)}
            helperText={formik.touched.airportName && formik.errors.airportName}
          >
            {/* {airports.map(al => (
              <MenuItem key={al.id} value={al.id}>{al.name}</MenuItem>
            ))} */}
          </TextField>

          <TextField
            // select
            fullWidth
            label="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          >
            {/* {airports.map(a => (
              <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
            ))} */}
          </TextField>

          <TextField
            // select
            fullWidth
            label="Facility"
            name="facility"
            value={formik.values.facility}
            onChange={formik.handleChange}
            error={formik.touched.facility && Boolean(formik.errors.facility)}
            helperText={formik.touched.facility && formik.errors.facility}
          >
            {/* {airports.map(a => (
              <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
            ))} */}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AirportForm;
