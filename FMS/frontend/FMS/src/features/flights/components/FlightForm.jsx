
import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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

  const { data: airports = [] } = useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });

  const { data: airlines = [] } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });

  const createMutation = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      onClose();
    },
  });

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
      flightID: initialFlight?.flightID || "",
      departureDateTime: initialFlight?.departureDateTime ? new Date(initialFlight.departureDateTime) : null,
      arrivalDateTime: initialFlight?.arrivalDateTime ? new Date(initialFlight.arrivalDateTime) : null,
      originalAirportCode: initialFlight?.originalAirportCode || "",
      destinationAirportCode: initialFlight?.destinationAirportCode || "",
      availableSeats: initialFlight?.availableSeats || 0,
      bookings: initialFlight?.bookings || [],
      airportId: initialFlight?.airportId || "",
      airlineId: initialFlight?.airlineId || "",
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        departureDateTime: values.departureDateTime?.toISOString(),
        arrivalDateTime: values.arrivalDateTime?.toISOString(),
      };

      if (isEdit) {
        updateMutation.mutate({ id: initialFlight.id, ...payload });
      } else {
        createMutation.mutate(payload);
      }
    },
  });

  useEffect(() => {
    if (initialFlight) {
      formik.setValues({
        ...initialFlight,
        departureDateTime: initialFlight.departureDateTime ? new Date(initialFlight.departureDateTime) : null,
        arrivalDateTime: initialFlight.arrivalDateTime ? new Date(initialFlight.arrivalDateTime) : null,
      });
    } else {
      formik.resetForm();
    }
  }, [initialFlight, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Flight" : "Create Flight"}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="Flight Number"
              name="flightNumber"
              value={formik.values.flightNumber}
              onChange={formik.handleChange}
            />

            <DatePicker
              label="Departure Date"
              value={formik.values.departureDateTime}
              onChange={(val) => formik.setFieldValue("departureDateTime", val)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <DatePicker
              label="Arrival Date"
              value={formik.values.arrivalDateTime}
              onChange={(val) => formik.setFieldValue("arrivalDateTime", val)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <TextField
              fullWidth
              label="Origin Airport Code"
              name="originalAirportCode"
              value={formik.values.originalAirportCode}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Destination Airport Code"
              name="destinationAirportCode"
              value={formik.values.destinationAirportCode}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              type="number"
              label="Available Seats"
              name="availableSeats"
              value={formik.values.availableSeats}
              onChange={formik.handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Airport</InputLabel>
              <Select
                name="airportId"
                value={formik.values.airportId}
                onChange={formik.handleChange}
              >
                {airports.map((a) => (
                  <MenuItem key={a.airportCode} value={a.airportCode}>
                    {a.airportName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Airline</InputLabel>
              <Select
                name="airlineId"
                value={formik.values.airlineId}
                onChange={formik.handleChange}
              >
                {airlines.map((al) => (
                  <MenuItem key={al.airlineId} value={al.airlineId}>
                    {al.airlineName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </LocalizationProvider>
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


// // src/features/flights/components/FlightForm.jsx
// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Stack,
//   Select,
// } from "@mui/material";
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchAirports,
//   fetchAirlines,
//   createFlight,
//   updateFlight,
// } from "../services/flightService";

// const FlightForm = ({ open, onClose, initialFlight }) => {
//   const queryClient = useQueryClient();
//   const isEdit = Boolean(initialFlight);

//   // ✅ Updated to object syntax
//   const { data: airports = [] } = useQuery({
//     queryKey: ["airports"],
//     queryFn: fetchAirports,
//   });
//   const { data: airlines = [] } = useQuery({
//     queryKey: ["airlines"],
//     queryFn: fetchAirlines,
//   });

//   // ✅ createFlight mutation
//   const createMutation = useMutation({
//     mutationFn: createFlight,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["flights"] });
//       onClose();
//     },
//   });

//   // ✅ updateFlight mutation
//   const updateMutation = useMutation({
//     mutationFn: updateFlight,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["flights"] });
//       onClose();
//     },
//   });

//   const formik = useFormik({
//     initialValues: {
//       flightNumber: initialFlight?.flightNumber || "",
//       flightID: initialFlight?.flightID || "",
//       departureDateTime: initialFlight?.departureDateTime || "",
//       arrivalDateTime: initialFlight?.arrivalDateTime || "",
//       originalAirportCode: initialFlight?.originalAirportCode || "",
//       destinationAirportCode: initialFlight?.destinationAirportCode || "",
//       availableSeats: initialFlight?.availableSeats || 0,
//       bookings: initialFlight?.bookings || [],
//       airportId: initialFlight?.airportId || "",
//       airlineId: initialFlight?.airlineId || "",
//     },
//     validationSchema: Yup.object({
//       flightNumber: Yup.string().required("Required"),
//       // departureDateTime: Yup.date().required("Required"),
//       // arrivalDateTime: Yup.date().required("Required"),
//       // originalAirportCode: Yup.string().required("Required"),
//       // destinationAirportCode: Yup.string().required("Required"),
//       // availableSeats: Yup.number().min(1, "Must be > 0").required("Required"),
//       airportId: Yup.string().required("Required"),
//       airlineId: Yup.string().required("Required"),
//     }),
//     onSubmit: (values) => {
//       console.log("Calling create ", values);

//       if (isEdit) {
//         updateMutation.mutate({ id: initialFlight.id, ...values });
//       } else {
//         createMutation.mutate(values);
//       }
//     },
//   });

//   useEffect(() => {
//     if (initialFlight) {
//       formik.resetForm({ values: initialFlight });
//     } else {
//       formik.resetForm();
//     }
//   }, [initialFlight, open]);

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{isEdit ? "Edit Flight" : "Create Flight"}</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} mt={1}>
//           {/* All your TextFields and selects as before */}
//           <TextField
//             fullWidth
//             label="Flight Number"
//             name="flightNumber"
//             value={formik.values.flightNumber}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.flightNumber && Boolean(formik.errors.flightNumber)
//             }
//             helperText={
//               formik.touched.flightNumber && formik.errors.flightNumber
//             }
//           />
      
//           <Select
//             select
//             fullWidth
//             label="Airport"
//             name="airportId"
//             value={formik.values.airportId}
//             onChange={formik.handleChange}
//             error={formik.touched.airportId && Boolean(formik.errors.airportId)}
//             helperText={formik.touched.airportId && formik.errors.airportId}
//           >
//             {airports.map((a) => (
//               <MenuItem key={a.airportCode} value={a.airportCode}>
//                 {a.airportName}
//               </MenuItem>
//             ))}
//           </Select>
//           <Select
//             select
//             fullWidth
//             label="Airline"
//             name="airlineId"
//             value={formik.values.airlineId}
//             onChange={formik.handleChange}
//             error={formik.touched.airlineId && Boolean(formik.errors.airlineId)}
//             helperText={formik.touched.airlineId && formik.errors.airlineId}
//           >
//             {airlines.map((al) => (
//               <MenuItem key={al.airlineId} value={al.airlineId}>
//                 {al.airlineName}
//               </MenuItem>
//             ))}
//           </Select>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button
//           onClick={formik.submitForm}
//           variant="contained"
//           disabled={formik.isSubmitting}
//         >
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FlightForm;
