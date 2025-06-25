// import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Button, MenuItem, Stack
// } from '@mui/material';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
//   fetchAirlines,
//   createAirline,
//   updateAirline
// } from '../services/airlineservice';


// const AirlineForm=({open,onClose,initialAirline})=>
// {

//      const queryClient = useQueryClient();
//       const isEdit = Boolean(initialAirline);
    
//       // ✅ createFlight mutation
//       const createMutation = useMutation({
//         mutationFn: createAirline,
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['airlines'] });
//           onClose();
//         },
//       });
    
//       // ✅ updateFlight mutation
//       const updateMutation = useMutation({
//         mutationFn: updateAirline,
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['airlines'] });
//           onClose();
//         },
//       });  
    
//       const formik=useFormik(
// {
//     initialValues:
//     { airlineName: initialAirline?.airlineName || '',
//       contactNumber: initialAirline?.contactNumber || '',
//       operatingRegion: initialAirline?.operatingRegion || '',
//       flights: initialAirline?.flights || '',
      
//     },
    
//      validationSchema: Yup.object({}),
    
//     onSubmit: (values) => {
//       if (isEdit) {
//         updateMutation.mutate({ id: initialAirline.id, ...values });
//       } else {
//         createMutation.mutate(values);
//       }
//     },
//   });

// useEffect(() => {
//     if (initialAirline) {
//       formik.resetForm({ values: initialAirline });
//     } else {
//       formik.resetForm();
//     }
//   }, [initialAirline, open]);


//   return (
//      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//        <DialogTitle>{isEdit ? 'Edit Airline' : 'Create Airline'}</DialogTitle>
//        <DialogContent>
//          <Stack spacing={2} mt={1}>
//            {/* All your TextFields and selects as before */}
//            <TextField
//              fullWidth
//              label="airlineName"
//              name="airlineName"
//              value={formik.values.airlineName}
//              onChange={formik.handleChange}
//              error={formik.touched.airlineName && Boolean(formik.errors.airlineName)}
//              helperText={formik.touched.airlineName && formik.errors.airlineName}
//            />
//            {/* ... other fields ... */}
//            <TextField
            
//              fullWidth
//              label="contactNumber"
//              name="contactNumber"
//              value={formik.values.contactNumber}
//              onChange={formik.handleChange}
//              error={formik.touched.contactNumber && Boolean(formik.errors.airportId)}
//              helperText={formik.touched.contactNumber && formik.errors.airportId}
//            >
      
//            </TextField>
       
//          </Stack>
//        </DialogContent>
//        <DialogActions>
//          <Button onClick={onClose}>Cancel</Button>
//          <Button
//            onClick={formik.submitForm}
//            variant="contained"
//            disabled={formik.isSubmitting}
//          >
//            Save
//          </Button>
//        </DialogActions>
//      </Dialog>
//    );}

// export default AirlineForm;

import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createAirline,
  updateAirline
} from '../services/airlineservice';

const AirlineForm = ({ open, onClose, initialAirline }) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(initialAirline);

  const createMutation = useMutation({
    mutationFn: createAirline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAirline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      airlineName: initialAirline?.airlineName || '',
      contactNumber: initialAirline?.contactNumber || '',
      operatingRegion: initialAirline?.operatingRegion || '',
    },
    validationSchema: Yup.object({
      airlineName: Yup.string().required('Airline name is required'),
      contactNumber: Yup.number()
        .typeError('Must be a valid number')
        .required('Contact number is required'),
      operatingRegion: Yup.string().required('Operating region is required'),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        updateMutation.mutate({ id: initialAirline.airlineId, ...values });
      } else {
        createMutation.mutate(values);
      }
    },
  });

  useEffect(() => {
    if (initialAirline) {
      formik.setValues({
        airlineName: initialAirline.airlineName || '',
        contactNumber: initialAirline.contactNumber || '',
        operatingRegion: initialAirline.operatingRegion || '',
      });
    } else {
      formik.resetForm();
    }
  }, [initialAirline, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Airline' : 'Create Airline'}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="Airline Name"
              name="airlineName"
              value={formik.values.airlineName}
              onChange={formik.handleChange}
              error={formik.touched.airlineName && Boolean(formik.errors.airlineName)}
              helperText={formik.touched.airlineName && formik.errors.airlineName}
            />

            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            />

            <TextField
              fullWidth
              label="Operating Region"
              name="operatingRegion"
              value={formik.values.operatingRegion}
              onChange={formik.handleChange}
              error={formik.touched.operatingRegion && Boolean(formik.errors.operatingRegion)}
              helperText={formik.touched.operatingRegion && formik.errors.operatingRegion}
            />
          </Stack>
        </form>
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

export default AirlineForm;
