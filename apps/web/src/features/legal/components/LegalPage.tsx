import type { ReactNode } from 'react';
import { Paper, Stack, Typography } from '@mui/material';

interface LegalPageProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {lastUpdated ? (
          <Typography variant="caption" color="text.secondary">
            Ultimo aggiornamento: {lastUpdated}
          </Typography>
        ) : null}
        <Stack spacing={2} sx={{ '& p': { color: 'text.secondary', lineHeight: 1.7 } }}>
          {children}
        </Stack>
      </Stack>
    </Paper>
  );
}
