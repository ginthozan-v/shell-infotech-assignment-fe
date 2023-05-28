import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import {
  createCafes,
  getCafes,
  updateCafes,
} from '../../../redux/actions/cafe';
import { SendRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const CafeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [cafeData, setCafeData] = useState({
    name: '',
    description: '',
    logo: '',
    location: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let cafes = useSelector((state) => state.cafes);

  const handleSubmit = async (value) => {
    setIsSubmitting(true);

    if (currentId) {
      await dispatch(updateCafes(currentId, value));
    } else {
      value.id = uuidv4();
      await dispatch(createCafes(value));
    }
    await dispatch(getCafes());
    setIsSubmitting(false);
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setCafeData({
      name: '',
      description: '',
      logo: '',
      location: '',
    });
    navigate('/cafe');
  };

  useEffect(() => {
    if (id) {
      setCurrentId(id);
      dispatch(getCafes());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentId && cafes) {
      const data = cafes.find((c) => c._id === currentId);
      if (data) {
        setCafeData({
          _id: data._id,
          id: data.id,
          name: data.name,
          description: data.description,
          logo: data.logo,
          location: data.location,
        });
      }
    }
  }, [currentId, cafes]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px', height: '100%' }}>
      <Paper sx={{ maxWidth: 'sm', margin: '0 auto', p: 4 }}>
        <Formik
          initialValues={cafeData}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(6, 'Must be atleast 6 characters')
              .max(10, 'Must be 10 characters or less')
              .required('Required'),
            description: Yup.string()
              .max(256, 'Must be 256 characters or less')
              .required('Required')
              .required('Required'),
            location: Yup.string().required('Required'),
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
                      size="small"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      error={errors.name && touched.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="location"
                      variant="outlined"
                      label="Location"
                      size="small"
                      fullWidth
                      value={values.location}
                      onChange={handleChange}
                      error={errors.location && touched.location}
                      helperText={errors.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      variant="outlined"
                      label="Description"
                      size="small"
                      fullWidth
                      value={values.description}
                      onChange={handleChange}
                      error={errors.description && touched.description}
                      helperText={errors.description}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setFieldValue('logo', base64)}
                      />
                    </div>
                  </Grid>
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
                      <span>{currentId ? 'Update' : 'Add'} Cafe</span>
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

export default CafeForm;
