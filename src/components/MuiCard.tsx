import { Box, Card, CardContent, Typography } from "@mui/material";

export const MuiCard = () => {
    return <Box width='300px'>
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component='div'>React</Typography>
                <Typography variant="body2" color='text.secondary'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur saepe quasi ullam molestias asperiores dignissimos similique! Exercitationem, dicta. Officia, provident doloribus fuga ullam modi quia impedit mollitia voluptates labore placeat.
                </Typography>
            </CardContent>
        </Card>
    </Box>
}