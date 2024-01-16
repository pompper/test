import { Stack, Button, IconButton, ButtonGroup, ToggleButtonGroup, ToggleButton } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import FormatBold from "@mui/icons-material";
import { FormatItalic } from "@mui/icons-material";
import { FormatUnderlined } from "@mui/icons-material";
// export const MuiButton = () => {
//   return (
//     <Stack spacing={2} direction='row' justifyContent='center'>
//         <Button variant='contained'>Customer</Button>
//         <Button variant='outlined'>Maintenance</Button>
//     </Stack>
//   )
// }


export const MuiButton = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction='row'>
      <Button variant="text" href='https://www.google.com'>Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      </Stack>

      <Stack spacing={2} direction='row'>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secodary</Button>
        <Button variant="contained" color="error">error</Button>
        <Button variant="contained" color="warning">waring</Button>
        <Button variant="contained" color="info">info</Button>
        <Button variant="contained" color="success">success</Button>
     </Stack>

      <Stack display='block' spacing={2} direction='row'>
        <Button variant='contained' size='small'>Small</Button>
        <Button variant='contained' size='medium'>Medium</Button>
        <Button variant='contained' size='large'>Small</Button>
      </Stack>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' startIcon={<SendIcon />} disableRipple onClick={() => alert('Click')}>Send</Button>
        <Button variant='contained' endIcon={<SendIcon />} disableElevation>Send</Button>

        <IconButton aria-label="send" color='success' size='small'>
          <SendIcon />
        </IconButton>
      </Stack>

      <Stack direction='row'>
        <ButtonGroup 
          variant="contained" 
          orientation="vertical" 
          size='small' 
          color='secondary'
          aria-label="alignment button group"
          >
          <Button onClick={() => alert('Left Clicked')}>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
    </Stack>

     
  )
}
