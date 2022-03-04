import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';


const theme = createTheme();
const SignUp:React.FC<{url: string}>=(props)=> {

  const url=`${props.url}/register`;
  console.log(url);
 

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo={
      username: data.get('username'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm')
    }
    axios.post(url, userInfo)
    .then((response:any) => {console.log(response);
    document.cookie=`token=${response.data.token}`
    alert("Başarılı bir şekilde kayıt oldunuz Sıgned In den giriş yapın")
    } )
    .catch((error:any) => {
        
        console.error('There was an error!', error);
    });
   
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
          
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password-Confirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="password-confirm"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}


export default SignUp;