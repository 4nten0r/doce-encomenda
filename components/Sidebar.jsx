'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Cake, 
  CalendarCheck, 
  Users, 
  BarChart3, 
  Store,
  X
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Painel Geral & Esteira', icon: LayoutDashboard },
  { id: 'catalog', label: 'Cardápio & Receitas', icon: Cake },
  { id: 'schedule', label: 'Agenda de Retirada', icon: CalendarCheck },
  { id: 'clients', label: 'Clientes VIP', icon: Users },
  { id: 'analytics', label: 'Relatórios Financeiros', icon: BarChart3 },
];

export default function Sidebar({ 
  currentTab = 'dashboard', 
  onSelectTab = () => {},
  isOpen = true,
  onClose = () => {}
}) {
  return (
    <aside 
      className={`bg-brand-surface border-r border-brand-border flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden border-none'
      }`}
    >
      <div className="w-64">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-brand-border/60">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm font-black tracking-wider text-sm shrink-0">
              NG
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-brand-text text-sm tracking-tight truncate">
                Netinha Gourmet
              </span>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                Painel da Confeiteira
              </span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="lg:hidden p-1.5 text-brand-muted hover:text-brand-text rounded-lg hover:bg-brand-surfaceSubtle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-5">
          <p className="px-3 text-[10px] font-extrabold tracking-widest text-brand-muted/80 uppercase mb-2">
            Módulos Operacionais
          </p>
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-surfaceSubtle'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer Profile & Atalho Cliente */}
      <div className="w-64 p-4 border-t border-brand-border/60 space-y-2">
        <a
          href="/"
          className="w-full py-2.5 px-3 rounded-xl bg-brand-surfaceSubtle hover:bg-brand-surface border border-brand-border text-brand-text text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          title="Ver o app como cliente"
        >
          <Store className="w-3.5 h-3.5 text-brand-primary" />
          <span>Abrir Portal do Cliente</span>
        </a>

        <div className="flex items-center justify-between p-2 rounded-xl bg-brand-surfaceSubtle/60 border border-brand-border/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-black shrink-0">
              NG
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-brand-text truncate">
                Confeiteira Chefe
              </span>
              <span className="text-[10px] text-brand-muted truncate">
                Netinha Gourmet
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
