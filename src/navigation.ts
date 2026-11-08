import {
  Download,
  House,
  ListMusic,
  MicVocal,
  type LucideIcon,
} from "lucide-react";

export interface NavSection {
  path: string;
  label: string;
  icon: LucideIcon;
}

// Itens do Menu Lateral do Painel
export const NAV_SECTIONS: NavSection[] = [
  { path: "/", label: "Início", icon: House },
  { path: "/musicas", label: "Músicas", icon: ListMusic },
  { path: "/artistas", label: "Artistas", icon: MicVocal },
  {
    path: "/importar",
    label: "Importar do YouTube",
    icon: Download,
  },
];
