import { MemoryRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

import { MuiButton } from '../components/MuiButton';

// Material UI
import {Stack, Button, Box, Card, CardContent, Typography, Grid } from "@mui/material";

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
      // setSettingData(data);
      // console.log(data)

        // Store the data from the second API call in a separate variable
      setSettingData({
        plcConnections: data.plcConnections, // Replace with the actual structure of the data
        plcReadConfig: data.plcReadConfig,
        autoReconnectPLC: data.autoReconnectPLC,
        stationInfo: data.stationInfo,
        stationDataMap: data.stationDataMap,
        baseBackendURL: data.baseBackendURL,
        healthCheck: data.healthCheck,
        password: data.password,
        slots: data.stationDataMap.cabinets[0].slots
      });
    });
  }, []); 

  const slots = stationLiveData?.cabinets[0]?.slots;
  
  // Release Button 
  const releaseButton = (slotId) => (e) => {
    e.preventDefault();
    console.log('The Release Button was clicked. > Slot id = ' + slotId);
  }

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
                        <Typography color='primary'><strong>Cabinet 1: (Cabinet)</strong> </Typography>
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
            {settingData && (
             <Box width='300px'>
                <Card>
                    <CardContent>
                      <Typography color='primary'><strong>Cabinet 1</strong> </Typography>
                      <Typography variant="subtitle1" component='div'>PLC IP: {settingData.plcConnections[0].host}</Typography>
                      <Typography variant="subtitle1" component='div'>UnitID: {settingData.plcConnections[0].unitId}</Typography>
                      <Typography variant="subtitle1" component='div'>Status: Connected</Typography>
                    </CardContent>
                </Card>
              </Box>
          )}

          {/* Loop Slots */}
          {settingData && (
             <Grid container my={2} spacing={2}>    
                {settingData.slots.map((slot, index) => (
                  <Grid item xs={6} md={4} lg={3} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" component='div' >
                          <Typography color='primary'><strong>Slot {index + 1}</strong> </Typography>
                          <div>ID: {slot.id}</div>
                          <div>Local ID: {slot.localId}</div>
                          <Box my={2}>
                            <Typography color='primary'><strong>RFID Config</strong> </Typography>
                            <div>Type: {slot.rfidConfig.type}</div>
                            <div>Start: {slot.rfidConfig.start}</div>
                            <div>Length: {slot.rfidConfig.length}</div>
                          </Box>      
                          <Button variant='contained' onClick={releaseButton(slot.id)}>Release</Button>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          )}            

          {/* Server Health */}
          {settingData && (
            <Box my={2}>
                <Card>
                    <CardContent>
                      <Typography color='primary'><strong>Server Health</strong> </Typography>
                      <Typography variant="subtitle1" component='div'>Status: Connected</Typography>
                    </CardContent>
                </Card>
              </Box>
          )}

          {/* Station Info */}
          {settingData && (
            <Box my={2}>
                <Card>
                    <CardContent>
                      <Typography color='primary'><strong>Station Info</strong> </Typography>
                      <Typography variant="subtitle1" component='div'>Station ID: {settingData.stationInfo.id}</Typography>
                      <Typography variant="subtitle1" component='div'>Address: {settingData.stationInfo.address}</Typography>
                      <Typography variant="subtitle1" component='div'>Code: {settingData.stationInfo.code}</Typography>
                      <Typography variant="subtitle1" component='div'>Type: {settingData.stationInfo.type}</Typography>
                      <Typography variant="subtitle1" component='div'>Version: {settingData.stationInfo.version}</Typography>
                      <Typography variant="subtitle1" component='div'>Last Updated: {settingData.stationInfo.lastUpdateTimestamp}</Typography>
                    </CardContent>
                </Card>
              </Box>
          )}

           {/* Additional Info */}
          {settingData && (
            <Box my={2}>
                <Card>
                    <CardContent>
                      <Typography color='primary'><strong>Addition Info</strong> </Typography>
                      <Typography variant="subtitle1" component='div'>Auto Reconnect PLC: {settingData.autoReconnectPLC ? "true" : "false"}</Typography>
                      <Typography variant="subtitle1" component='div'>Base Backend URL: {settingData.baseBackendURL}</Typography>
                    </CardContent>
                </Card>
              </Box>
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
      <MuiButton/>
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
