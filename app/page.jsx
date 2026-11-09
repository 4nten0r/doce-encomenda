'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import KpiCard from '../components/KpiCard';
import OrderKanban from '../components/OrderKanban';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Download 
} from 'lucide-react';

const INITIAL_ORDERS = [
  {
    id: '#DOCE-4081',
    clientName: 'Fernanda Lima Alencar',
    clientPhone: '(11) 98765-4321',
    items: [
      { name: 'Bolo Clássico Ninho c/ Morangos (1.5kg)', quantity: 1, price: 120.00 }
    ],
    totalAmount: 120.00,
    depositAmount: 60.00,
    remainingAmount: 60.00,
    status: 'Em Produção',
    pickupDate: '2026-11-10',
    pickupWindow: 'Manhã (10h - 12h)',
  },
  {
    id: '#DOCE-4082',
    clientName: 'Beatriz Vasconcelos',
    clientPhone: '(11) 97123-8899',
    items: [
      { name: 'Balas de Coco Recheadas Gourmet (500g)', quantity: 2, price: 55.00 },
      { name: 'Caixa 50 Brigadeiros Belga Nobre', quantity: 1, price: 75.00 }
    ],
    totalAmount: 185.00,
    depositAmount: 92.50,
    remainingAmount: 92.50,
    status: 'Aguardando Sinal',
    pickupDate: '2026-11-10',
    pickupWindow: 'Tarde (14h - 16h30)',
  },
  {
    id: '#DOCE-4083',
    clientName: 'Rodrigo Fontes',
    clientPhone: '(11) 99442-1100',
    items: [
      { name: 'Bolo Red Velvet Nobre (1.5kg)', quantity: 1, price: 140.00 }
    ],
    totalAmount: 140.00,
    depositAmount: 70.00,
    remainingAmount: 70.00,
    status: 'Pronto p/ Retirar',
    pickupDate: '2026-11-09',
    pickupWindow: 'Fim de Tarde (17h - 19h)',
  },
  {
    id: '#DOCE-4084',
    clientName: 'Camila Guimarães',
    clientPhone: '(11) 98112-9090',
    items: [
      { name: 'Combo Festa Completa', quantity: 1, price: 170.00 }
    ],
    totalAmount: 170.00,
    depositAmount: 85.00,
    remainingAmount: 85.00,
    status: 'Concluído',
    pickupDate: '2026-11-09',
    pickupWindow: 'Manhã (10h - 12h)',
  }
];

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Status transition pipeline
  const handleStatusChange = (orderId) => {
    const pipeline = ['Aguardando Sinal', 'Em Produção', 'Pronto p/ Retirar', 'Concluído'];

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = pipeline.indexOf(order.status);
        if (currentIndex < pipeline.length - 1) {
          return { ...order, status: pipeline[currentIndex + 1] };
        }
        return order;
      })
    );
  };

  const handleNewOrderModal = () => {
    const novoCodigo = `#DOCE-${Math.floor(1000 + Math.random() * 9000)}`;
    const novoPedido = {
      id: novoCodigo,
      clientName: 'Cliente Balcão Novo',
      clientPhone: '(11) 99999-0000',
      items: [{ name: 'Bolo Clássico Ninho (1.5kg)', quantity: 1, price: 120.00 }],
      totalAmount: 120.00,
      depositAmount: 60.00,
      remainingAmount: 60.00,
      status: 'Aguardando Sinal',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupWindow: 'Tarde (14h - 16h30)',
    };
    setOrders((prev) => [novoPedido, ...prev]);
  };

  // Calculations for KPIs
  const totalReceita = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalSinaisRecebidos = orders
    .filter((o) => o.status !== 'Aguardando Sinal')
    .reduce((acc, curr) => acc + curr.depositAmount, 0);
  const pedidosEmProducao = orders.filter((o) => o.status === 'Em Produção').length;
  const pedidosProntos = orders.filter((o) => o.status === 'Pronto p/ Retirar').length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const term = searchQuery.toLowerCase();
    return (
      o.clientName.toLowerCase().includes(term) ||
      o.id.toLowerCase().includes(term) ||
      o.items.some((i) => i.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Navigation Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewOrder={handleNewOrderModal}
        />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Painel de Operações & Esteira
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Monitore o fluxo de encomendas, faturamento diário e liberação de insumos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Exportar Relatório</span>
              </button>
            </div>
          </div>

          {/* KPI Statistics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Faturamento Previsto"
              value={`R$ ${totalReceita.toFixed(2).replace('.', ',')}`}
              subtitle="Soma total dos pedidos ativos"
              trend="+12.4%"
              trendType="positive"
              icon={DollarSign}
            />
            <KpiCard
              title="Sinais Confirmados (PIX)"
              value={`R$ ${totalSinaisRecebidos.toFixed(2).replace('.', ',')}`}
              subtitle="50% antecipado em caixa"
              trend="+8.1%"
              trendType="positive"
              icon={TrendingUp}
            />
            <KpiCard
              title="Esteira em Produção"
              value={pedidosEmProducao.toString()}
              subtitle="Bolos & doces na bancada"
              badge="Tempo Real"
              icon={Clock}
            />
            <KpiCard
              title="Prontos para Retirada"
              value={pedidosProntos.toString()}
              subtitle="Aguardando comparecimento"
              badge="Hoje"
              icon={CheckCircle2}
            />
          </div>

          {/* Kanban Pipeline Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  Status da Produção
                </h2>
                <p className="text-[11px] text-slate-500">
                  Arraste ou avance os pedidos conforme a esteira artesanal progride.
                </p>
              </div>
            </div>

            <OrderKanban
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
