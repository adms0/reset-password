import React, {Fragment, useEffect, useState} from 'react';
import {Typography, TextField, Grid} from '@mui/material';
import './App.css';
import {ComponentProps, FormForgotPasswordType} from './static';
import * as Yup from 'yup'
import {Formik, Form} from 'formik';
import CheckPasswordStreangth from './components/CheckPasswordComplexStrength';
import NalysaLogo from './components/NalysaLogo';
import LoadingButton from './components/LoadingButton';
import {httpHelper} from './helpers/httpHelper';


const initialValue = {
  newPassword: '',
  confirmPassword: ''
}

const ResetForm: React.FC<ComponentProps> = props => {
  // untuk menjalankan json server npm run server
  const url = 'http://localhost:5424/users';
  const api = httpHelper()
  const [state, setState] = useState({
    isLoading: false,
  });
  const [stateData, setStateData] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    api.get(url).then((res) => setStateData(res)).catch((err) => console.log(err))
  }

  const postUser = (user: any) => {
    api.post(`${url}`, {body: user}).then((res) => getUsers()).catch((err) => console.log(err))
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string().min(8, 'Kata Sandi minimal 8 karakter').required('Mohon masukan kata sandi yang benar'),
    // @ts-ignore 
    confirmPassword: Yup.string().required('Konfirmasi Kata Sandi tidak boleh kosong').oneOf([Yup.ref('newPassword'), null], 'Konfirmasi password tidak sama')
  })

  const handleLoading = () => {
    setTimeout(() => {
      setState({
        ...state,
        isLoading: false,
      });
    }, 2000);
  };


  const handleSubmit = (values: FormForgotPasswordType) => {
    // Untuk sekedar demo push kedalam json server 
    // selanjutnya tambahkan snackbar sebagai notif sukses / berhasil mengirim ke json server
    postUser({
      id: stateData?.length + 1,
      password: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    })
    setTimeout(() => {
      setState({
        ...state,
        isLoading: !state?.isLoading,
      });
      handleLoading();
    }, 2000);
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({values, errors, ...formikProps}) => {
          return (
            <Form id={'reset-password-form'} aria-label={'form'} noValidate>
              <TextField
                size={'medium'}
                id={'newPassword'}
                type='password'
                variant='outlined'
                name='newPassword'
                margin='normal'
                placeholder='Kata Sandi Baru'
                value={values.newPassword}
                onChange={formikProps.handleChange}
                error={formikProps.touched.newPassword && Boolean(errors.newPassword)}
                helperText={formikProps.touched.newPassword && errors.newPassword}
                fullWidth
                required
                sx={{
                  '& .Mui-error': {borderRadius: 3},
                  border: 'none'
                }}
                inputProps={{
                  style: {backgroundColor: '#515151', color: '#fff', borderRadius: 15, border: 'none'},
                }}
              />
              <CheckPasswordStreangth password={values.newPassword} />
              <TextField
                size={'medium'}
                id={'confirmPassword'}
                type='password'
                variant='outlined'
                name='confirmPassword'
                margin='normal'
                placeholder='Konfirmasi Kata Sandi Baru'
                value={values.confirmPassword}
                onChange={formikProps.handleChange}
                error={formikProps.touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={formikProps.touched.confirmPassword && errors.confirmPassword}
                fullWidth
                required
                sx={{
                  '& .Mui-error': {borderRadius: 3},
                  border: 'none'
                }}
                inputProps={{
                  style: {backgroundColor: '#515151', color: '#fff', borderRadius: 15, border: 'none'},
                }}
              />
              <Grid item xs style={{textAlign: 'center', marginTop: 12}}>
                <LoadingButton
                  variant="contained"
                  sx={{mt: 1}}
                  fullWidth
                  disableElevation
                  type="submit"
                  loading={state?.isLoading}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Fragment>
  )

}

const App: React.FC<ComponentProps> = props => {
  return (
    <div className='min-h-screen flex flex-col justify-center bg-black-primary'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='text-center'>
          <Typography variant={'h2'} className="text-center text-4xl text-secondary leading-9 font-bold">
            Atur Ulang Kata Sandi
            <NalysaLogo />
          </Typography>
          <Typography className="text-secondary px-4 md:px-16 mt-5 md:mt-8">
            {'Masukan kata sandi baru Anda pada kolom di bawah ini'}
          </Typography>
        </div>
        <div className='mt-5 bg-white py-8 px-4 sm:px-10'>
          <ResetForm {...props} />
        </div>
      </div>
    </div>
  );
}

export default App;
