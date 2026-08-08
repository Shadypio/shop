import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as RouterLink } from 'react-router-dom';
import type { Category } from '../../features/storefront/types';

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <List disablePadding>
        {categories.map((category, index) => (
          <ListItemButton
            key={category.id}
            component={RouterLink}
            to={`/categoria/${category.slug}`}
            divider={index < categories.length - 1}
            sx={{ py: 1.5 }}
          >
            <ListItemText
              slotProps={{ primary: { fontWeight: 600 } }}
              primary={category.name}
            />
            <ArrowForwardIosIcon fontSize="small" sx={{ color: 'text.disabled' }} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
