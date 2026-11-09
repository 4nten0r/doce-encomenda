'use client';

import React from 'react';
import { 
  Clock, 
  ChevronRight, 
  Phone,
  Inbox
} from 'lucide-react';

const COLUMNS = [
  { id: 'Aguardando Sinal', label: '1. Aguardando Sinal (50%)', dot: 'bg-amber-500', badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30' },
  { id: 'Em Produção', label: '2. Em Produção (Bancada)', dot: 'bg-indigo-500', badgeClass: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30' },
  { id: 'Pronto p/ Retirar', label: '3. Pronto p/ Retirar', dot: 'bg-teal-500', badgeClass: 'bg-teal-500/15 text-teal-700 dark:text-teal-400 border border-teal-500/30' },
  { id: 'Concluído', label: '4. Concluído & Entregue', dot: 'bg-emerald-500', badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' },
];

export default function OrderKanban({ orders = [], onStatusChange = () => {} }) {
  const formatarMoeda = (val) => `R$ ${Number(val || 0).toFixed(2).replace('.', ',')}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-4 no-scrollbar">
      {COLUMNS.map((column) => {
        const columnOrders = orders.filter((order) => order.status === column.id);

        return (
          <div key={column.id} className="flex flex-col gap-3 min-w-[280px]">
            {/* Column Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${column.dot}`}></span>
                <h4 className="text-xs font-bold text-brand-text truncate">{column.label}</h4>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${column.badgeClass}`}>
                {columnOrders.length}
              </span>
            </div>

            {/* Column Body Cards */}
            <div className="space-y-3 p-2 rounded-2xl bg-brand-surfaceSubtle/50 border border-brand-border/60 min-h-[460px] flex-1">
              {columnOrders.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                  <Inbox className="w-6 h-6 text-brand-muted/40 mb-1" />
                  <span className="text-xs font-semibold text-brand-muted/60">Nenhum pedido nesta fase</span>
                </div>
              ) : (
                columnOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-brand-surface rounded-xl border border-brand-border flex flex-col justify-between gap-3 hover:border-brand-primary/40 transition-all"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[10px] font-black text-brand-primary bg-brand-surfaceSubtle border border-brand-border px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-brand-muted font-bold">
                          <Clock className="w-3 h-3 text-brand-primary" />
                          <span>{order.pickupWindow ? order.pickupWindow.split(' ')[0] : ''}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <h5 className="text-xs font-serif font-bold text-brand-text">
                        {order.clientName}
                      </h5>

                      <div className="flex items-center gap-1.5 text-[11px] text-brand-muted mt-0.5">
                        <Phone className="w-3 h-3 text-brand-muted" />
                        <span>{order.clientPhone}</span>
                      </div>

                      {/* Items */}
                      <div className="mt-2.5 pt-2 border-t border-brand-border/60 space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="text-brand-text font-medium truncate max-w-[170px]">
                              &bull; {item.quantity}x {item.name}
                            </span>
                            <span className="text-brand-primary font-bold font-mono">
                              {formatarMoeda(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Footer */}
                    <div className="pt-2 border-t border-brand-border/60">
                      <div className="flex justify-between items-center text-[11px] mb-1">
                        <span className="text-brand-muted">Sinal 50% (PIX):</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-serif">
                          {formatarMoeda(order.depositAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] mb-2.5">
                        <span className="text-brand-muted">Saldo na retirada:</span>
                        <span className="font-black text-brand-text font-serif">
                          {formatarMoeda(order.remainingAmount)}
                        </span>
                      </div>

                      {/* Move status button */}
                      {column.id !== 'Concluído' ? (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order.id)}
                          className="w-full py-2 px-3 rounded-lg bg-brand-surfaceSubtle hover:bg-brand-primary hover:text-white border border-brand-border text-brand-primary text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Avançar Fase</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="py-1.5 text-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          Pedido Finalizado
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
