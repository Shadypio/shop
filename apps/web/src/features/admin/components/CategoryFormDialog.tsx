import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { AdminCategory } from '../types';

interface CategoryFormDialogProps {
  open: boolean;
  category: AdminCategory | null; // null = creazione, valorizzato = modifica
  submitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export function CategoryFormDialog({
  open,
  category,
  submitting = false,
  errorMessage,
  onSubmit,
  onClose,
}: CategoryFormDialogProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) {
      setName(category?.name ?? '');
    }
  }, [open, category]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(name);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{category ? 'Modifica categoria' : 'Nuova categoria'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Nome categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={submitting}>
            Annulla
          </Button>
          <Button type="submit" variant="contained" disabled={submitting || !name.trim()}>
            {submitting ? 'Salvataggio…' : 'Salva'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
