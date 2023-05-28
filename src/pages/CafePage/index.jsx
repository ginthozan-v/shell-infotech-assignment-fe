import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  ButtonGroup,
  Container,
  Paper,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteCafes,
  getCafes,
  getCafesBySearch,
} from '../../redux/actions/cafe';

import Table from '../../components/Table';

import { AddTwoTone, DeleteTwoTone, EditTwoTone } from '@mui/icons-material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CafePage = () => {
  const [rowsData, setRowsData] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes);
  const query = useQuery();
  const searchQuery = query.get('location');
  const navigate = useNavigate();

  const handleKeyPress = () => {
    if (search === '') {
      dispatch(getCafes());
      navigate('/');
    }
  };

  const deleteRow = async (id) => {
    let isExecuted = window.confirm('Are you sure to execute this deletion?');
    if (isExecuted) {
      await dispatch(deleteCafes(id));
    }
  };

  const editRow = (id) => {
    navigate(`/edit-cafe/${id}`);
  };

  const ButtonRender = (params) => {
    return (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => editRow(params.data._id)}
          variant="contained"
          size="small"
          startIcon={<EditTwoTone />}
        >
          Edit
        </Button>

        <Button
          onClick={() => deleteRow(params.data._id)}
          variant="contained"
          size="small"
          startIcon={<DeleteTwoTone />}
        >
          Delete
        </Button>
      </ButtonGroup>
    );
  };

  const ImageRender = (params) => {
    return <Avatar src={params.data.logo ?? '/broken-image.jpg'} />;
  };

  const LinkRender = (params) => {
    return (
      <Link to={`/employee?cafe=${params.data.name}`}>
        {params.data.employees} Employees
      </Link>
    );
  };

  const [columnDefs] = useState([
    { field: 'logo', cellRenderer: ImageRender, autoHeight: true },
    { field: 'name' },
    { field: 'description' },
    { field: 'employees', cellRenderer: LinkRender },
    { field: 'location' },
    { field: '', cellRenderer: ButtonRender },
  ]);

  const searchCafe = () => {
    if (search.trim()) {
      dispatch(getCafesBySearch({ search }));
      navigate(`/cafe?location=${search}`);
    } else {
      dispatch(getCafes());
      navigate('/');
    }
  };

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      if (searchQuery) {
        await dispatch(getCafesBySearch({ search: searchQuery }));
      } else {
        await dispatch(getCafes());
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let tableData = [];
    cafes.map((d) =>
      tableData.push({
        _id: d._id,
        id: d.id,
        logo: d.logo,
        name: d.name,
        description: d.description,
        employees: d.employees?.length,
        location: d.location,
      })
    );
    setRowsData(tableData.sort((a, b) => b.employees - a.employees));
  }, [cafes]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%', height: '100%', bgcolor: '#e0e0e0' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Cafes List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <TextField
                sx={{ flexShrink: 0 }}
                name="search"
                variant="outlined"
                label="Location Search"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <Button
                variant="contained"
                size="medium"
                onClick={() => searchCafe()}
              >
                Search
              </Button>
            </Box>
            <Link to="/create-cafe">
              <Button
                variant="contained"
                size="medium"
                startIcon={<AddTwoTone />}
              >
                Add New Cafe
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer sx={{ width: '100%', height: '100%' }}>
          <Table rows={rowsData} column={columnDefs} />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CafePage;
