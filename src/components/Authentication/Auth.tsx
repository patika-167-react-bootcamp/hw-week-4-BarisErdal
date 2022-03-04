
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Auth:React.FC<{url: string; signedIn:(s:boolean)=>void}>=(props)=> {
  //login butonu
  const handleSignedIn =(s:boolean) =>{
props.signedIn(s);
  }
  
      const [value, setValue] = React.useState(0);
      const TOK="";
      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        };

      interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }
      
      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;     
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography component={'span'} >{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
       
        return (
          <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "flex-end" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign Up" {...a11yProps(0)} />
                <Tab label="Sign In" {...a11yProps(1)} />
              
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <SignUp url={`${props.url}/auth`}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignIn url={`${props.url}/auth`} signedIn={handleSignedIn}/>
            </TabPanel>
           
          </Box>
        );
      
}

export default Auth