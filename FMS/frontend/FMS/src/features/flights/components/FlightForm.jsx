// src/features/flights/components/FlightForm.jsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAirports,
  fetchAirlines,
  createFlight,
  updateFlight,
} from "../services/flightService";

const FlightForm = ({ open, onClose, initialFlight }) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(initialFlight);

  // ✅ Updated to object syntax
  const { data: airports = [] } = useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });
  const { data: airlines = [] } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });

  // ✅ createFlight mutation
  const createMutation = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      onClose();
    },
  });

  // ✅ updateFlight mutation
  const updateMutation = useMutation({
    mutationFn: updateFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      flightNumber: initialFlight?.flightNumber || "",
      departureDateTime: initialFlight?.departureDateTime || "",
      arrivalDateTime: initialFlight?.arrivalDateTime || "",
      originalAirportCode: initialFlight?.originalAirportCode || "",
      destinationAirportCode: initialFlight?.destinationAirportCode || "",
      availableSeats: initialFlight?.availableSeats || 0,
      bookings: initialFlight?.bookings || 0,
      airportId: initialFlight?.airportId || "",
      airlineId: initialFlight?.airlineId || "",
    },
    validationSchema: Yup.object({
      flightNumber: Yup.string().required("Required"),
      departureDateTime: Yup.date().required("Required"),
      arrivalDateTime: Yup.date().required("Required"),
      originalAirportCode: Yup.string().required("Required"),
      destinationAirportCode: Yup.string().required("Required"),
      availableSeats: Yup.number().min(1, "Must be > 0").required("Required"),
      // airportId: Yup.string().required("Required"),
      airlineId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Calling create ", values);

      if (isEdit) {
        updateMutation.mutate({ id: initialFlight.id, ...values });
      } else {
        createMutation.mutate(values);
      }
    },
  });

  useEffect(() => {
    if (initialFlight) {
      formik.resetForm({ values: initialFlight });
    } else {
      formik.resetForm();
    }
  }, [initialFlight, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Flight" : "Create Flight"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* All your TextFields and selects as before */}
          <TextField
            fullWidth
            label="Flight Number"
            name="flightNumber"
            value={formik.values.flightNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.flightNumber && Boolean(formik.errors.flightNumber)
            }
            helperText={
              formik.touched.flightNumber && formik.errors.flightNumber
            }
          />
          {/* ... other fields ... */}
          <TextField
            select
            fullWidth
            label="Airport"
            name="airportId"
            value={formik.values.airportId}
            onChange={formik.handleChange}
            error={formik.touched.airportId && Boolean(formik.errors.airportId)}
            helperText={formik.touched.airportId && formik.errors.airportId}
          >
            {airports.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Airline"
            name="airlineId"
            value={formik.values.airlineId}
            onChange={formik.handleChange}
            error={formik.touched.airlineId && Boolean(formik.errors.airlineId)}
            helperText={formik.touched.airlineId && formik.errors.airlineId}
          >
            {airlines.map((al) => (
              <MenuItem key={al.airlineId} value={al.airlineName}>
                {al.airlineName}
              </MenuItem>
            ))}
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

export default FlightForm;
