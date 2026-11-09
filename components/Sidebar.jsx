'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Cake, 
  CalendarCheck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard, badge: null, active: true },
  { id: 'orders', label: 'Pedidos & Esteira', icon: ShoppingBag, badge: '8', active: false },
  { id: 'catalog', label: 'Cardápio & Receitas', icon: Cake, badge: null, active: false },
  { id: 'schedule', label: 'Agenda de Retirada', icon: CalendarCheck, badge: null, active: false },
  { id: 'clients', label: 'Clientes VIP', icon: Users, badge: null, active: false },
  { id: 'analytics', label: 'Relatórios Financeiros', icon: BarChart3, badge: null, active: false },
];

export default function Sidebar({ currentTab = 'dashboard', onSelectTab = () => {} }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm font-semibold tracking-wider text-sm">
            NG
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 text-sm tracking-tight leading-none">
              Netinha Gourmet
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Confeitaria Premium
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Gestão Operacional
          </p>
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (!currentTab && item.active);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-800 truncate">
                Administração
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                confeitaria@netinha.com
              </span>
            </div>
          </div>
          <button 
            type="button" 
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
            title="Sair do painel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
