import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import type { AdminCategory, AdminProduct } from '../types';
import { useRemoveProductImage, useUploadProductImage } from '../queries';

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  available: boolean;
}

interface ProductFormDialogProps {
  open: boolean;
  product: AdminProduct | null; // null = creazione, valorizzato = modifica
  categories: AdminCategory[];
  submitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: ProductFormValues) => void;
  onClose: () => void;
}

const emptyValues: ProductFormValues = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  available: true,
};

export function ProductFormDialog({
  open,
  product,
  categories,
  submitting = false,
  errorMessage,
  onSubmit,
  onClose,
}: ProductFormDialogProps) {
  const [values, setValues] = useState<ProductFormValues>(emptyValues);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadImage = useUploadProductImage();
  const removeImage = useRemoveProductImage();

  useEffect(() => {
    if (open) {
      setValues(
        product
          ? {
              name: product.name,
              description: product.description ?? '',
              price: String(product.price),
              categoryId: product.category.id,
              available: product.available,
            }
          : emptyValues,
      );
    }
    // Dipende solo da `open` e dall'id del prodotto (non dall'intero oggetto):
    // il prodotto viene ri-fetchato "live" dopo ogni upload/rimozione immagine
    // (per mostrarle subito nel dialog), ma questo non deve resettare i campi
    // di testo che l'utente sta eventualmente ancora modificando.
  }, [open, product?.id]);

  function handleChange<K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && product) {
      uploadImage.mutate({ productId: product.id, file });
    }
    e.target.value = '';
  }

  // L'upload/rimozione immagini richiede un prodotto già esistente (serve
  // l'id): per un prodotto nuovo l'utente deve prima salvare, poi riaprire
  // la modifica per gestire le foto. Scelta pragmatica per l'MVP.
  const canManageImages = Boolean(product);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product ? 'Modifica prodotto' : 'Nuovo prodotto'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Nome prodotto"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Descrizione"
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Prezzo (€)"
              type="number"
              inputProps={{ step: '0.01', min: '0' }}
              value={values.price}
              onChange={(e) => handleChange('price', e.target.value)}
              required
              fullWidth
            />
            <TextField
              select
              label="Categoria"
              value={values.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              required
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <FormControlLabel
            control={
              <Switch
                checked={values.available}
                onChange={(e) => handleChange('available', e.target.checked)}
              />
            }
            label="Disponibile nel catalogo"
          />

          {canManageImages ? (
            <Box>
              <Box sx={{ mb: 1, fontSize: 14, fontWeight: 600 }}>Immagini</Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                {product?.images.map((image) => (
                  <Box key={image.id} sx={{ position: 'relative' }}>
                    <Avatar
                      src={image.url}
                      variant="rounded"
                      sx={{ width: 64, height: 64 }}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        removeImage.mutate({ productId: product.id, imageId: image.id })
                      }
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                      }}
                      aria-label="Rimuovi immagine"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ width: 64, height: 64, border: 1, borderColor: 'divider', borderRadius: 1 }}
                  aria-label="Carica immagine"
                  disabled={uploadImage.isPending}
                >
                  <AddPhotoAlternateOutlinedIcon />
                </IconButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileSelected}
                />
              </Stack>
            </Box>
          ) : (
            <Alert severity="info">
              Potrai caricare le immagini dopo aver salvato il prodotto.
            </Alert>
          )}

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={submitting}>
            Annulla
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || !values.name.trim() || !values.price || !values.categoryId}
          >
            {submitting ? 'Salvataggio…' : 'Salva'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
