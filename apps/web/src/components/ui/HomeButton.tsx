import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function HomeButton() {
  return (
    <Box sx={{ width: 200, alignSelf: 'center' }}>
      <Link to="/">
        <Button variant="contained" fullWidth>
          Torna alla home
        </Button>
      </Link>
    </Box>
  );
}
