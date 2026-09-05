import { IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium';
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 50,
  size = 'medium',
}: QuantityStepperProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 999,
        bgcolor: 'background.paper',
        width: 'fit-content',
      }}
    >
      <IconButton
        size={size}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuisci quantità"
        sx={{ color: 'text.primary' }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ minWidth: 22, textAlign: 'center', userSelect: 'none' }}
      >
        {value}
      </Typography>
      <IconButton
        size={size}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumenta quantità"
        sx={{ color: 'primary.main' }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
