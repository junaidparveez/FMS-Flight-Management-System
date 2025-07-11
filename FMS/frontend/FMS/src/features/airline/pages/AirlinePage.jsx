import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightIcon from "@mui/icons-material/Flight";

import AirlineForm from "../components/AirlineForm";
import AirlineChart from "../components/AirlineChart";

import { fetchAirlines, deletAirline } from "../services/airlineservice";

const AirlinePage = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedAirline, setSelectedAirline] = useState(null);

  const { data: airlines = [], isLoading, isError } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });

  const deleteMutation = useMutation({
    mutationFn: deletAirline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["airlines"] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this Airline?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleRowClick = (params) => {
    setSelectedAirline(params.row);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedAirline(null);
    setOpen(true);
  };

  const totalAirlines = airlines.length;

  const columns = [
    { field: "airlineId", headerName: "Airline ID", width: 130 },
    { field: "airlineName", headerName: "Airline Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "operatingRegion", headerName: "Region", width: 120 },
    { field: "flights", headerName: "Flights", width: 100 },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
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
                Airlines Dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Create New Airline
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={2} mb={2}>
            <Card variant="outlined" sx={{ flex: 1, bgcolor: '#e3f2fd', border: 0 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Total Airlines</Typography>
                <Typography variant="h3" color="primary.main" fontWeight={700}>{totalAirlines}</Typography>
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
              <Typography variant="h6" mb={1} color="primary">Airlines Overview</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load chart data.</Typography>
              ) : (
                <AirlineChart airlines={airlines} />
              )}
            </Paper>
          </Box>
          <Box mt={3}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" mb={2} color="primary">Airlines Table</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load airlines data.</Typography>
              ) : (
                <DataGrid
                  rows={airlines}
                  columns={columns}
                  getRowId={(row) => row.id || row.airlineId}
                  loading={isLoading}
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 20]}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 300 },
                    },
                  }}
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
        <AirlineForm
          open={open}
          onClose={() => setOpen(false)}
          initialAirline={selectedAirline}
        />
      </Container>
    </Box>
  );
};

export default AirlinePage;

