import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  useAdminCategories,
  useAdminProducts,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from '../queries';
import { ProductFormDialog, type ProductFormValues } from '../components/ProductFormDialog';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { ApiError } from '../../../lib/api-client';
import { formatPrice } from '../../../lib/format';
import type { AdminProduct } from '../types';

export function ProductsPage() {
  const { data: products, isLoading, isError } = useAdminProducts();
  const { data: categories } = useAdminCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);

  // Deriva il prodotto in modifica dai dati "live" della query (non uno
  // snapshot congelato all'apertura del dialog): così l'upload/rimozione
  // immagini si riflette immediatamente nel form senza doverlo richiudere.
  const editingProduct = editingProductId
    ? (products ?? []).find((p) => p.id === editingProductId) ?? null
    : null;

  const activeMutation = editingProduct ? updateProduct : createProduct;

  function openCreateForm() {
    setEditingProductId(null);
    setFormOpen(true);
  }

  function openEditForm(product: AdminProduct) {
    setEditingProductId(product.id);
    setFormOpen(true);
  }

  function handleSubmit(values: ProductFormValues) {
    const payload = {
      name: values.name,
      description: values.description || undefined,
      price: Number(values.price),
      categoryId: values.categoryId,
      available: values.available,
    };

    const mutation = editingProduct
      ? updateProduct.mutateAsync({ id: editingProduct.id, payload })
      : createProduct.mutateAsync(payload);

    mutation.then(() => setFormOpen(false)).catch(() => {});
  }

  function handleToggleAvailable(product: AdminProduct) {
    updateProduct.mutate({ id: product.id, payload: { available: !product.available } });
  }

  function handleDelete() {
    if (!productToDelete) return;
    deleteProduct.mutate(productToDelete.id, {
      onSuccess: () => setProductToDelete(null),
    });
  }

  const formError =
    activeMutation.error instanceof ApiError ? activeMutation.error.message : null;
  const deleteError =
    deleteProduct.error instanceof ApiError ? deleteProduct.error.message : null;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Prodotti
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateForm}>
          Nuovo prodotto
        </Button>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile caricare i prodotti.</Alert>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="right">Prezzo</TableCell>
                <TableCell align="center">Disponibile</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(products ?? []).map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ width: 56 }}>
                    <Avatar
                      src={product.images[0]?.url}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    >
                      {product.name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Chip label={product.category.name} size="small" />
                  </TableCell>
                  <TableCell align="right">{formatPrice(product.price)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={product.available ? 'Visibile nel catalogo' : 'Nascosto'}>
                      <Switch
                        checked={product.available}
                        onChange={() => handleToggleAvailable(product)}
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEditForm(product)} aria-label="Modifica">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setProductToDelete(product)}
                      aria-label="Elimina"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {(products ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Nessun prodotto creato.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        categories={categories ?? []}
        submitting={activeMutation.isPending}
        errorMessage={formError}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="Eliminare il prodotto?"
        description={
          deleteError ??
          `Stai per eliminare "${productToDelete?.name}". L'operazione non è reversibile.`
        }
        loading={deleteProduct.isPending}
        onConfirm={handleDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </Box>
  );
}
