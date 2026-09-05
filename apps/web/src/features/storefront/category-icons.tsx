import type { ReactElement } from 'react';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

// Associazione puramente presentazionale slug/nome → icona: rende le
// categorie riconoscibili a colpo d'occhio senza richiedere al negoziante
// di caricare un'immagine per ognuna. Basata su parole chiave così da
// funzionare "out of the box" anche per negozi futuri con categorie simili
// (es. una ferramenta con "utensili", "vernici", ecc. userà il fallback).
const KEYWORD_ICONS: Array<{ keywords: string[]; icon: ReactElement }> = [
  { keywords: ['lavatrice', 'bucato'], icon: <LocalLaundryServiceOutlinedIcon /> },
  { keywords: ['piatt', 'lavastoviglie'], icon: <WaterDropOutlinedIcon /> },
  { keywords: ['ammorbidente', 'profum'], icon: <SpaOutlinedIcon /> },
  { keywords: ['pulizia', 'casa', 'sgrass', 'candeggina'], icon: <CleaningServicesOutlinedIcon /> },
];

export function getCategoryIcon(label: string): ReactElement {
  const normalized = label.toLowerCase();
  const match = KEYWORD_ICONS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match?.icon ?? <CategoryOutlinedIcon />;
}
