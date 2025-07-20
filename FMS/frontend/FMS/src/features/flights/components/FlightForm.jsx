
import React, { useEffect,useState} from "react";
import apiClient from "../../../common/services/apiClient";
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
import { format } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAirports, fetchAirlines, createFlight, updateFlight } from "../services/flightService";


const FlightForm = ({ open, onClose, initialFlight }) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(initialFlight);
 const [options, setOptions] = useState([]);
  // Fetch airports and airlines
  const { data: airports = [] } = useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });
  const { data: airlines = [] } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });
 
  
    // load airport options on mount
    useEffect(() => {
      apiClient
        .get("/airports/options")
        .then((res) => setOptions(res.data))
        .catch((err) => console.error(err));
    }, []);

  // Mutations
  const createMutation = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      onClose();
    },
    onSettled: () => {
      formik.setSubmitting(false);
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      onClose();
    },
    onSettled: () => {
      formik.setSubmitting(false);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      flightNumber: initialFlight?.flightNumber || "",
      flightID: initialFlight?.flightID || "",
    
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
             };
      if (isEdit) {
        updateMutation.mutate({ id: initialFlight.flightID, ...payload });
      } else {
        createMutation.mutate(payload);
      }
    },
  });

  // Reset form on dialog open or initialFlight change
  useEffect(() => {
    if (initialFlight) {
      formik.setValues({
        ...initialFlight,
              });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFlight, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isEdit ? "Edit Flight" : "Create Flight"}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2} mt={1}>
              {/* Flight Number */}
              <TextField
                fullWidth
                label="Flight Number"
                name="flightNumber"
                value={formik.values.flightNumber}
                onChange={formik.handleChange}
              />

              {/* Origin Airport Code */}
              <TextField
                select
                label="Source"
                name="originalAirportCode"
                value={formik.values.originalAirportCode}
                onChange={formik.handleChange}
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
                name="destinationAirportCode"
                value={formik.values.destinationAirportCode}
                onChange={formik.handleChange}
                sx={{ minWidth: 200 }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Available Seats */}
              <TextField
                fullWidth
                type="number"
                label="Available Seats"
                name="availableSeats"
                value={formik.values.availableSeats}
                onChange={formik.handleChange}
              />

              {/* Airport Select */}
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

              {/* Airline Select */}
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
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Save
          </Button>
        </DialogActions>
      </form>
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
