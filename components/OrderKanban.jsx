'use client';

import React from 'react';
import { 
  Clock, 
  ChevronRight, 
  Phone
} from 'lucide-react';

const COLUMNS = [
  { id: 'Aguardando Sinal', label: 'Aguardando Sinal', color: 'border-amber-500/20 bg-amber-50/50 text-amber-800' },
  { id: 'Em Produção', label: 'Em Produção', color: 'border-blue-500/20 bg-blue-50/50 text-blue-800' },
  { id: 'Pronto p/ Retirar', label: 'Pronto p/ Retirar', color: 'border-emerald-500/20 bg-emerald-50/50 text-emerald-800' },
  { id: 'Concluído', label: 'Concluído', color: 'border-slate-300 bg-slate-100/60 text-slate-700' },
];

export default function OrderKanban({ orders = [], onStatusChange = () => {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {COLUMNS.map((column) => {
        const columnOrders = orders.filter((order) => order.status === column.id);

        return (
          <div key={column.id} className="flex flex-col gap-3">
            {/* Column Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${column.id === 'Em Produção' ? 'bg-blue-600' : column.id === 'Aguardando Sinal' ? 'bg-amber-500' : column.id === 'Pronto p/ Retirar' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                <h4 className="text-xs font-bold text-slate-800">{column.label}</h4>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${column.color}`}>
                {columnOrders.length}
              </span>
            </div>

            {/* Column Body Cards */}
            <div className="space-y-3 min-h-[420px] p-2 bg-slate-100/50 rounded-2xl border border-slate-200/50">
              {columnOrders.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-xs font-medium text-slate-400">Nenhum pedido nesta fase</span>
                </div>
              ) : (
                columnOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow transition-shadow flex flex-col justify-between gap-3"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{order.pickupWindow}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <h5 className="text-xs font-bold text-slate-900">
                        {order.clientName}
                      </h5>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{order.clientPhone}</span>
                      </div>

                      {/* Items */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="text-slate-600 font-medium truncate max-w-[170px]">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-slate-900 font-semibold font-mono">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Footer */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex justify-between items-center text-[11px] mb-2">
                        <span className="text-slate-500">Sinal 50%:</span>
                        <span className="font-bold text-emerald-700">
                          R$ {order.depositAmount.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] mb-3">
                        <span className="text-slate-500">Restante na entrega:</span>
                        <span className="font-bold text-slate-800">
                          R$ {order.remainingAmount.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Move status button */}
                      {column.id !== 'Concluído' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order.id)}
                          className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Avançar Fase</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
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
