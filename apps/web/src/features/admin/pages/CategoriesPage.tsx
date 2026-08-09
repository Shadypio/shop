import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  useAdminCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../queries';
import { CategoryFormDialog } from '../components/CategoryFormDialog';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { ApiError } from '../../../lib/api-client';
import type { AdminCategory } from '../types';

export function CategoriesPage() {
  const { data: categories, isLoading, isError } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null);

  const activeMutation = editingCategory ? updateCategory : createCategory;

  function openCreateForm() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function openEditForm(category: AdminCategory) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  function handleSubmit(name: string) {
    const mutation = editingCategory
      ? updateCategory.mutateAsync({ id: editingCategory.id, payload: { name } })
      : createCategory.mutateAsync({ name });

    mutation.then(() => setFormOpen(false)).catch(() => {});
  }

  function handleDelete() {
    if (!categoryToDelete) return;
    deleteCategory.mutate(categoryToDelete.id, {
      onSuccess: () => setCategoryToDelete(null),
    });
  }

  const formError =
    activeMutation.error instanceof ApiError ? activeMutation.error.message : null;
  const deleteError =
    deleteCategory.error instanceof ApiError ? deleteCategory.error.message : null;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Categorie
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateForm}>
          Nuova categoria
        </Button>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile caricare le categorie.</Alert>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(categories ?? []).map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>{category.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                    {category.slug}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEditForm(category)} aria-label="Modifica">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setCategoryToDelete(category)}
                      aria-label="Elimina"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {(categories ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Nessuna categoria creata.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CategoryFormDialog
        open={formOpen}
        category={editingCategory}
        submitting={activeMutation.isPending}
        errorMessage={formError}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        title="Eliminare la categoria?"
        description={
          deleteError ??
          `Stai per eliminare "${categoryToDelete?.name}". L'operazione non è reversibile.`
        }
        loading={deleteCategory.isPending}
        onConfirm={handleDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </Box>
  );
}
