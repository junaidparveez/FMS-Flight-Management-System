import React,{useState} from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, IconButton
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import AirlineForm from "../components/AirlineForm";
import AirlineChart from "../components/AirlineChart";

import { fetchAirlines ,deletAirline} from "../services/airlineservice";

const AirlinePage=()=>
{
const[open,setOpen]=useState();
 const queryClient = useQueryClient();

const[selectedAirine,setSelectedAirline]=useState();



const { data: airlines = [], isLoading } = useQuery({
    queryKey: ['airlines'],
    queryFn: fetchAirlines,
  });

const deleteMutation = useMutation({
    mutationFn: deletAirline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
    },
  });
const handleDelete = id => {
    if (window.confirm('Delete this Airline?')) {
      deleteMutation.mutate(id);
    }
  };
    const handleRowClick = params => {
    setSelectedAirline(params.row);
    setOpen(true);
  };
  const handleCreate = () => {
    setSelectedAirline(null);
    setOpen(true);
  };

  const totalAirlines = airlines.length;

  const columns = [
    { field: 'airlineId', headerName: 'Flight #', width: 130 },
    { field: 'airlineName', headerName: 'Departure', flex: 1 },
    { field: 'contactNumber', headerName: 'Arrival', flex: 1 },
    { field: 'operatingRegion', headerName: 'Origin', width: 100 },
    { field: 'flights', headerName: 'Destination', width: 100 },
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
       <Box display="flex" height="100vh">
      {/* 2) Sidebar with fixed width */}
   

      {/* 3) Main content area grows to fill remaining space */}
      <Box component="main" flexGrow={1} p={2} overflow="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Airlines</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create New Airline
          </Button>
        </Box>

        <Box my={2} display="flex" gap={2}>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Airline</Typography>
              <Typography variant="h4">{totalAirlines}</Typography>
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ flex: 1 }}>
           
          </Card>
        </Box>

        <Box my={2}>
          <AirlineChart airlines={airlines} />
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={airlines}
            columns={columns}
            getRowId={row => row.id || row.airlineId}
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

        <AirlineForm
          open={open}
          onClose={() => setOpen(false)}
          initialAirline={selectedAirine}
        />
      </Box>
    </Box>
  );

}
export default AirlinePage;