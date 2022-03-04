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

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const axios = require('axios').default;


const theme = createTheme();

const SignIn:React.FC<{url: string; signedIn:(s:boolean)=>void}>=(props)=> {
  const url=`${props.url}/login`;



  const handleSubmit = (event:any) => {
    event.preventDefault();
     const data = new FormData(event.currentTarget);
     const userInfo={
      username: data.get('username'),
      password: data.get('password'),
    }

    axios.post(url, userInfo)
        .then((response:any) => {
         if(response.status===200){
          document.cookie = `token=${response.data.token}` 
          //login olunca APP js yeniden render etmek için
         props.signedIn(true);
          
         }
          
          
          } )
        .catch((error:any) => {
          alert("giriş başarısız catch den");
          console.log("hata alındı",error);
            
        });

       
 
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
        
          <Typography component={'span'}  variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}


export default SignIn;