import { Stack, Button } from "@mui/material"

export const MuiButton = () => {
  return (
    <Stack spacing={2} direction='row' justifyContent='center'>
        <Button variant='contained'>Customer</Button>
        <Button variant='outlined'>Maintenance</Button>
    </Stack>
  )
}
