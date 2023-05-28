import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { addEmployeeCafes, getCafes } from '../../../redux/actions/cafe';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from '../../../redux/actions/employee';

import { SendRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

function generateUUID() {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds
  return 'UIXXXXXXX'.replace(/[X]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'X' && r).toString(16);
  });
}

const EmployeeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    cafe: '',
  });
  const [cafeDropdown, setCafeDropdown] = useState([]);
  const cafes = useSelector((state) => state.cafes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const phoneRegExp = /^[89]\d{7}$/;

  let employees = useSelector((state) => state.employees);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const uuid = generateUUID();

    if (currentId) {
      await dispatch(updateEmployee(currentId, values));
    } else {
      values.id = uuid;
      await dispatch(createEmployee(values));
    }

    // add employee to cafe if cafe selected
    if (values.cafe !== '') {
      const employee = {
        _id: values._id,
        name: values.name,
        startDate: new Date(),
      };
      await dispatch(addEmployeeCafes(values.cafe, employee));
    }
    await dispatch(getEmployees());
    setIsSubmitting(false);
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setEmployeeData({
      name: '',
      email: '',
      phone: '',
      gender: '',
    });
    navigate('/employee');
  };

  useEffect(() => {
    if (id) {
      setCurrentId(id);
      dispatch(getCafes());
      dispatch(getEmployees());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentId && employees) {
      const data = employees.find((c) => c._id === currentId);
      if (data) {
        setEmployeeData({
          _id: data._id,
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
        });
      }
    }
  }, [employees, currentId]);

  useEffect(() => {
    if (cafes) {
      let dropdown = [];
      cafes.map((cafe) =>
        dropdown.push({
          label: cafe.name,
          value: cafe._id,
        })
      );
      setCafeDropdown(dropdown);
    }
  }, [cafes]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px', height: '100%' }}>
      <Paper sx={{ maxWidth: 'sm', margin: '0 auto', p: 4 }}>
        <Formik
          initialValues={employeeData}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(6, 'Must be atleast 6 characters')
              .max(10, 'Must be 10 characters or less')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            phone: Yup.string()
              .matches(phoneRegExp, 'Phone number is not valid')
              .required('Required'),
            gender: Yup.string().required('Required'),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <Typography variant="h6">
                  {currentId ? 'Edit' : 'Create'} a Cafe
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="name"
                      variant="outlined"
                      label="Name"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      error={errors.name && touched.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      variant="outlined"
                      label="Email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email && touched.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="phone"
                      variant="outlined"
                      label="Phone"
                      fullWidth
                      value={values.phone}
                      onChange={handleChange}
                      error={errors.phone && touched.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      error={errors.gender && touched.gender}
                      fullWidth
                    >
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={values.gender}
                        onChange={(e) =>
                          setFieldValue('gender', e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                      <FormHelperText>{errors.gender}</FormHelperText>
                    </FormControl>
                  </Grid>
                  {currentId && cafeDropdown && (
                    <Grid item xs={6}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={cafeDropdown}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Cafe"
                            value={values.cafe}
                          />
                        )}
                        onChange={(event, newValue) =>
                          setFieldValue('cafe', newValue.value)
                        }
                      />
                    </Grid>
                  )}

                  <Grid item xs={4}></Grid>

                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      onClick={() => clear()}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingButton
                      size="small"
                      type="submit"
                      color="primary"
                      endIcon={<SendRounded />}
                      loading={isSubmitting}
                      loadingPosition="end"
                      variant="contained"
                      fullWidth
                    >
                      <span>{currentId ? 'Update' : 'Add'} Employee</span>
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default EmployeeForm;
