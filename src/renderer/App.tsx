import { MemoryRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { Typography } from '@mui/material';
import { Stack, Button } from "@mui/material"

import { Box, Card, CardContent, Typography, Grid } from "@mui/material";


// function Hello() {
//   const count = useAppSelector(selectCount);
//   const dispatch = useAppDispatch();
//   const [incrementAmount, setIncrementAmount] = useState('2');
//     return (
//     <div></div>
//   );
// }

// Main Page (Customer / Maintenance)
function Main(){
  return (
    <div className="App">
      <Typography variant='h4'>Home</Typography>
      <Typography variant='subtitle1'>Main Page</Typography>
      <Typography variant='body1'>This is the main page of app</Typography>
      <div className="image">Put some image here</div>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <Link to="/customer"><Button variant='contained'>Customer</Button></Link>
        <Link to="/monitor"><Button variant='outlined'>Maintenance</Button></Link>
      </Stack>
    </div>
  )
}

// Customer Page
function Customer(){
  return(
    <div>
      Customer Page<br></br>
      <Link to="/"><Button variant='text'>Back</Button></Link>
    </div>
  )
}

// Maintenance Menu
function MaintainenceMenu(props){
  const [menus, setMenu] = useState(['monitor','setting','sandbox'])
  return(
     <aside>
      {menus.map((menu, index) => (
        <Link key={index} to={"/"+menu}><Button variant={props.page === menu ? 'contained' : 'outlined'}>{menu}</Button></Link>
      ))}
     </aside>
     )
}

// Monitor Component
function Monitor(){
  const [stationLiveData, setStationLiveData] = useState(null);
  const [settingData, setSettingData] = useState(null)

   // First API call (getStationLiveData)
  useEffect(() => {
    window.electron.engineIpc.getStationLiveData().then((data) => {
      setStationLiveData(data);
    });

  // Second API call (getSettings)
    window.electron.engineIpc.getSettings().then((data) => {
      setSettingData(data);
    });
  }, []); 

  const slots = stationLiveData?.cabinets[0]?.slots;
  const hostAddress = settingData?.plcConnections[0]?.host;

  return (
    <div>
      <Stack direction='row'>
        <MaintainenceMenu page="monitor"/>
          <section>
            <Typography variant='h4'>Monitor</Typography>
            {/* Load stationLiveData */}
            {stationLiveData ? (
              <Box width='300px'>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" component='div'>Cabinet 1: (Cabinet)</Typography>
                        <Typography variant="subtitle1" component='div'>Status : Connected</Typography>
                    </CardContent>
                </Card>
              </Box>) : (<p>Loading...</p>)
              }

            {/* Loop through slots and render each data */}
            {slots ? (
              <Grid container my={2} spacing={2}>    
                {slots.map((slot, index) => (
                  <Grid item xs={6} md={4} lg={3} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" component='div' >
                          <Typography color='primary'><strong>Slot {index + 1}</strong> </Typography>
                          <div>ID: {slot.id}</div>
                          <div>Local ID: {slot.localId}</div>
                          <div>RFID: {slot.rfid}</div>
                          <div>Cabinet Local ID: {slot.cabinetLocalId}</div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (<p>No slots available</p>)}

            {/*Station Setting Data */}
            {/* Display host address here */}
            {hostAddress && (
              <Typography variant="subtitle1" component='div'>Host Address: {hostAddress}</Typography>
            )}
          </section>
      </Stack>
      <Link to="/"><Button variant='text'>Back</Button></Link>
    </div>
  )
}

// Setting Component
function Setting(){
  return (
    <div>
      <Stack direction='row'>
        <MaintainenceMenu page="setting"/>
        <section>
          <Typography variant='h4'>Setting</Typography>
        </section>
      </Stack>
      <Link to="/"><Button variant='text'>Back</Button></Link>
    </div>
  )
}

// Sandbox Component
function Sandbox(){
  return (
   <div>
    <Stack direction='row'>
      <MaintainenceMenu page="sandbox"/>
     <section>
      <Typography variant='h4'>Sandbox</Typography>
     </section>
    </Stack>
    <Link to="/"><Button variant='text'>Back</Button></Link>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/sandbox" element={<Sandbox />} />
      </Routes>
    </Router>
  );
}
