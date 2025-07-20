import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, IconButton, Container, CircularProgress, Paper, Divider
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PassengerForm from '../components/PassengerForm';
import { fetchPassengers, deletePassenger } from '../services/passengerService';

const PassengerPage = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);

  const { data: passengers = [], isLoading, isError } = useQuery({
    queryKey: ['passengers'],
    queryFn: fetchPassengers,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePassenger,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passengers'] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this passenger?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleRowClick = (params) => {
    setSelectedPassenger(params.row);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedPassenger(null);
    setOpen(true);
  };

  const columns = [
    { field: 'passengerId', headerName: 'Passenger ID', width: 130 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'emailId', headerName: 'Email', flex: 1 },
    { field: 'passportNumber', headerName: 'Passport', width: 140 },
    
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              Passengers Dashboard
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Add Passenger
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {/* Show passenger report/table if not adding or editing */}
          {!open && (
            <Box mt={3}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" mb={2} color="primary">Passengers Table</Typography>
                {isLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                    <CircularProgress />
                  </Box>
                ) : isError ? (
                  <Typography color="error">Failed to load passengers data.</Typography>
                ) : (
                  <DataGrid
                    rows={passengers}
                    columns={columns}
                    getRowId={row => row.id || row.passengerId}
                    loading={isLoading}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowClick={handleRowClick}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } } }}
                    disableSelectionOnClick
                    autoHeight
                    sx={{
                      bgcolor: '#fafafa',
                      borderRadius: 2,
                      boxShadow: 0,
                      '& .MuiDataGrid-columnHeaders': { bgcolor: '#e3f2fd' },
                    }}
                  />
                )}
              </Paper>
            </Box>
          )}
        </Paper>
        {/* Show PassengerForm only when adding or editing */}
        {open && (
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <PassengerForm
              open={open}
              onClose={() => setOpen(false)}
              initialPassenger={selectedPassenger}
              onSuccess={() => {
                setOpen(false);
                setSelectedPassenger(null);
                queryClient.invalidateQueries({ queryKey: ['passengers'] });
              }}
            />
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PassengerPage;