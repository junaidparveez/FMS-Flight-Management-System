import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, IconButton, Container, CircularProgress, Paper, Divider
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import AirportChart from '../components/AirportChart';
import { fetchAirports, deleteAirport } from '../services/airportService';
import AirportForm from '../components/AirportForm'; 


const AirportPage = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedAirport , setSelectedAirport] = useState(null);

  const { data : airports = [], isLoading, isError } = useQuery({
        queryKey: ['airports'],
        queryFn: fetchAirports,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAirport, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['airports'] });
        },
    });

    const handleDelete = id => {
        if (window.confirm('Delete this airport?')) {
            deleteMutation.mutate(id);
        }
    }

    const handleRowClick = params => {
        setSelectedAirport(params.row);
        setOpen(true);
    };

    const handleCreate = () => {
        setSelectedAirport(null);
        setOpen(true);
    };

      const totalAirports = airports.length;
    const columns = [
    { field: 'airportCode', headerName: 'Airport #', width: 130 },
    { field: 'airportName', headerName: 'Airport Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'facility', headerName: 'Facility', width: 100 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: params => (
        <IconButton onClick={() => handleDelete(params.id)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FlightIcon color="primary" fontSize="large" />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                Airports Dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Create New Airport
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={2} mb={2}>
            <Card variant="outlined" sx={{ flex: 1, bgcolor: '#e3f2fd', border: 0 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Total Airports</Typography>
                <Typography variant="h3" color="primary.main" fontWeight={700}>{totalAirports}</Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ flex: 1, bgcolor: '#fff3e0', border: 0 }}>
              <CardContent>
                {/* You can add more stats here if needed */}
              </CardContent>
            </Card>
          </Box>
          <Box my={2}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#f9fafb' }}>
              <Typography variant="h6" mb={1} color="primary">Airports Overview</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load chart data.</Typography>
              ) : (
                <AirportChart  />
              )}
            </Paper>
          </Box>
          <Box mt={3}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" mb={2} color="primary">Airports Table</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load airports data.</Typography>
              ) : (
                <DataGrid
                  rows={airports}
                  columns={columns}
                  getRowId={row => row.id || row.airportCode}
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
        </Paper>
        <AirportForm
          open={open}
          onClose={() => setOpen(false)}
          initialAirport={selectedAirport}
        />
      </Container>
    </Box>
  );
}

export default AirportPage;