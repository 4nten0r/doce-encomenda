'use client';

import React from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  PanelLeft,
  Moon,
  Sun
} from 'lucide-react';

export default function Topbar({ 
  onNewOrder = () => {}, 
  searchQuery = '', 
  onSearchChange = () => {},
  onToggleSidebar = () => {},
  theme = 'light',
  onToggleTheme = () => {}
}) {
  const dataHoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());

  const dataCapitalizada = dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1);

  return (
    <header className="h-20 bg-brand-surface border-b border-brand-border px-5 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Sidebar Toggle & Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl border border-brand-border text-brand-text hover:bg-brand-surfaceSubtle transition-colors flex items-center justify-center"
          title="Mostrar / Ocultar Menu Lateral"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por cliente, código (#DOCE-000) ou item..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surfaceSubtle text-xs text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-medium"
          />
        </div>
      </div>

      {/* Action Buttons & Dark Mode */}
      <div className="flex items-center gap-2.5">
        <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-surfaceSubtle border border-brand-border text-brand-muted text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-brand-primary" />
          <span>{dataCapitalizada}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl border border-brand-border text-brand-text hover:bg-brand-surfaceSubtle transition-all"
          title="Alternar entre Modo Claro e Escuro"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-brand-text" />
          )}
        </button>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onNewOrder}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold shadow-sm transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Novo Pedido</span>
        </button>
      </div>
    </header>
  );
}
