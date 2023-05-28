import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../../api';
import { getEmployees, getEmployeesByCafe } from '../../redux/actions/employee';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  TableContainer,
  Typography,
} from '@mui/material';
import Table from '../../components/Table';
import { useLocation } from 'react-router';
import { AddTwoTone, DeleteTwoTone, EditTwoTone } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmployeePage = () => {
  const [rowsData, setRowsData] = useState([]);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const query = useQuery();
  const searchQuery = query.get('cafe');
  const navigate = useNavigate();

  const deleteRow = (id) => {
    let isExecuted = window.confirm('Are you sure to execute this deletion?');
    if (isExecuted) {
      dispatch(deleteEmployee(id));
    }
  };

  const editRow = (id) => {
    navigate(`/edit-employee/${id}`);
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

  const [columnDefs] = useState([
    { field: 'employee_id' },
    { field: 'name' },
    { field: 'email_address' },
    { field: 'phone_number' },
    { field: 'gender' },
    { field: 'days_worked' },
    { field: 'cafe' },
    { field: '', cellRenderer: ButtonRender, width: '300px' },
  ]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(getEmployeesByCafe({ search: searchQuery }));
    } else {
      dispatch(getEmployees());
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    let tableData = [];
    employees
      ?.sort((a, b) => b.days - a.days)
      .map((d) =>
        tableData.push({
          _id: d._id,
          employee_id: d.id,
          name: d.name,
          email_address: d.email,
          phone_number: d.phone,
          gender: d.gender,
          days_worked: d.days !== undefined && d.days + ' days',
          cafe: d.cafe,
        })
      );

    setRowsData(tableData);
  }, [employees]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px', height: '100%' }}>
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
              Employees List
            </Typography>
            <Link to="/create-employee">
              <Button
                variant="contained"
                size="small"
                startIcon={<AddTwoTone />}
              >
                Add New Employee
              </Button>
            </Link>
          </Box>
          <TableContainer sx={{ width: '100%', height: '100%' }}>
            <Table rows={rowsData} column={columnDefs} />
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default EmployeePage;
