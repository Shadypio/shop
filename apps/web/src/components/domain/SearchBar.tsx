import { InputAdornment, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import type { SxProps, Theme } from '@mui/material/styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

// Campo di ricerca unico, riusato sia nell'header (sempre visibile, non
// nascosto dietro un'icona) sia nella pagina risultati: la ricerca deve
// essere un'azione di primo piano in un e-commerce, non un'opzione secondaria.
export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Cerca un prodotto…',
  size = 'medium',
  sx,
}: SearchBarProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder}
      size={size}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.secondary' }} fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 999,
          bgcolor: 'background.paper',
        },
        ...sx,
      }}
    />
  );
}
