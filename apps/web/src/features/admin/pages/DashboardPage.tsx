import { Alert, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import { useDashboardSummary } from '../queries';
import { SummaryCard } from '../../../components/domain/SummaryCard';

export function DashboardPage() {
  const { data: summary, isLoading, isError } = useDashboardSummary();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError || !summary ? (
        <Alert severity="error">Impossibile caricare i dati della dashboard.</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              label="Ordini totali"
              value={summary.totalOrders}
              icon={<ReceiptLongOutlinedIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              label="In attesa"
              value={summary.pendingOrders}
              icon={<HourglassEmptyOutlinedIcon />}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              label="Completati"
              value={summary.completedOrders}
              icon={<CheckCircleOutlineIcon />}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              label="Ordini di oggi"
              value={summary.todayOrders}
              icon={<TodayOutlinedIcon />}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
