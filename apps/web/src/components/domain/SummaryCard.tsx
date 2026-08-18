import { Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface SummaryCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  color?: 'primary' | 'warning' | 'success';
}

export function SummaryCard({ label, value, icon, color = 'primary' }: SummaryCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${color}.main`,
          color: `${color}.contrastText`,
        }}
      >
        {icon}
      </Stack>
      <Stack>
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}
