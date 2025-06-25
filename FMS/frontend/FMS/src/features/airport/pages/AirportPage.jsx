import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, IconButton
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AirportChart from '../components/AirportChart';
import { fetchAirports, deleteAirport } from '../services/airportService';
import AirportForm from '../components/AirportForm'; 


const AirportPage = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedAirport , setSelectedAirport] = useState(null);

    const { data : airports = [], isLoading } = useQuery({
        queryKey: ['airports'],
        queryFn: fetchAirports, // Assuming fetchAirports is adapted to fetch airports
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

// export default FlightsPage;
    // 1) Top‐level flex container
    <Box display="flex" height="100vh">
      {/* 2) Sidebar with fixed width */}
   

      {/* 3) Main content area grows to fill remaining space */}
      <Box component="main" flexGrow={1} p={2} overflow="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Airports</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create New Airport
          </Button>
        </Box>

        <Box my={2} display="flex" gap={2}>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Airports</Typography>
              <Typography variant="h4">{totalAirports}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* <Box my={2}>
          <AirportChart airports={airports} />
        </Box> */}

        <Box sx={{ height: 500, width: '100%' }}>
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
          />
        </Box>

        <AirportForm
          open={open}
          onClose={() => setOpen(false)}
          initialAirport={selectedAirport}
        />
      </Box>
    </Box>
  );
}

export default AirportPage;