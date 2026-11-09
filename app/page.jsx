'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import KpiCard from '../components/KpiCard';
import OrderKanban from '../components/OrderKanban';
import { 
  DollarSign, 
  Wallet, 
  ChefHat, 
  CheckCircle2, 
  Plus, 
  Sun, 
  Coffee, 
  Sunset, 
  Phone, 
  MessageCircle, 
  Edit3 
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: "p1", nome: "Bolo Clássico Ninho c/ Morangos (1.5kg)", categoria: "bolos", preco: 120.00, rendimento: "Serve até 15 pessoas", receita: "3 latas Leite Condensado, 0.5kg Trigo, 4 Ovos, 200g Manteiga" },
  { id: "p2", nome: "Bolo Red Velvet Nobre (1.5kg)", categoria: "bolos", preco: 140.00, rendimento: "Serve até 15 pessoas", receita: "2 potes Cream Cheese, 0.5kg Trigo, 100g Cacau, 300g Açúcar" },
  { id: "p3", nome: "Bolo Pistache & Frutas Vermelhas (1.5kg)", categoria: "bolos", preco: 160.00, rendimento: "Serve até 15 pessoas", receita: "200g Pasta de Pistache, 4 Ovos, Geléia Artesanal" },
  { id: "p4", nome: "Caixa 50 Brigadeiros Belga Nobre", categoria: "doces", preco: 75.00, rendimento: "50 unidades", receita: "4 latas Leite Condensado, 150g Callebaut, 200g Granulado Belga" },
  { id: "p5", nome: "Cento de Brigadeiros Tradicionais", categoria: "doces", preco: 90.00, rendimento: "100 unidades", receita: "8 latas Leite Condensado, 200g Cacau, 300g Granulado" },
  { id: "p9", nome: "Balas de Coco Recheadas Gourmet (500g)", categoria: "balas", preco: 55.00, rendimento: "Aprox. 40 unidades", receita: "1kg Açúcar Cristal, 200ml Leite de Coco Puro, Recheio Ninho" },
  { id: "p10", nome: "Balas de Coco Tradicionais de Festa (500g)", categoria: "balas", preco: 42.00, rendimento: "Aprox. 50 unidades", receita: "1kg Açúcar Cristal, 250ml Leite de Coco Artesanal" }
];

const INITIAL_ORDERS = [
  {
    id: '#DOCE-4081',
    clientName: 'Fernanda Lima Alencar',
    clientPhone: '(11) 98765-4321',
    items: [{ name: 'Bolo Clássico Ninho c/ Morangos (1.5kg)', quantity: 1, price: 120.00 }],
    totalAmount: 120.00,
    depositAmount: 60.00,
    remainingAmount: 60.00,
    status: 'Em Produção',
    pickupDate: '2026-11-10',
    pickupWindow: 'Manhã (10h - 12h)'
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
    pickupWindow: 'Tarde (14h - 16h30)'
  },
  {
    id: '#DOCE-4083',
    clientName: 'Rodrigo Fontes',
    clientPhone: '(11) 99442-1100',
    items: [{ name: 'Bolo Red Velvet Nobre (1.5kg)', quantity: 1, price: 140.00 }],
    totalAmount: 140.00,
    depositAmount: 70.00,
    remainingAmount: 70.00,
    status: 'Pronto p/ Retirar',
    pickupDate: '2026-11-09',
    pickupWindow: 'Fim de Tarde (17h - 19h)'
  },
  {
    id: '#DOCE-4084',
    clientName: 'Camila Guimarães',
    clientPhone: '(11) 98112-9090',
    items: [{ name: 'Cento de Brigadeiros Tradicionais', quantity: 1, price: 90.00 }],
    totalAmount: 90.00,
    depositAmount: 45.00,
    remainingAmount: 45.00,
    status: 'Concluído',
    pickupDate: '2026-11-09',
    pickupWindow: 'Manhã (10h - 12h)'
  }
];

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [products] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    const savedTheme = localStorage.getItem('doce_encomenda_tema') || 'light';
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;

    try {
      const stored = localStorage.getItem('doce_encomenda_pedidos');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setOrders(parsed);
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('doce_encomenda_tema', newTheme);
  };

  const handleStatusChange = (orderId) => {
    const pipeline = ['Aguardando Sinal', 'Em Produção', 'Pronto p/ Retirar', 'Concluído'];
    setOrders((prev) => {
      const updated = prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = pipeline.indexOf(order.status);
        if (currentIndex < pipeline.length - 1) {
          return { ...order, status: pipeline[currentIndex + 1] };
        }
        return order;
      });
      try {
        localStorage.setItem('doce_encomenda_pedidos', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleNewOrder = () => {
    const novoCodigo = `#DOCE-${Math.floor(1000 + Math.random() * 9000)}`;
    const novoPedido = {
      id: novoCodigo,
      clientName: 'Cliente Balcão VIP',
      clientPhone: '(11) 98888-2233',
      items: [{ name: 'Bolo Clássico Ninho c/ Morangos (1.5kg)', quantity: 1, price: 120.00 }],
      totalAmount: 120.00,
      depositAmount: 60.00,
      remainingAmount: 60.00,
      status: 'Aguardando Sinal',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupWindow: 'Tarde (14h - 16h30)'
    };
    setOrders((prev) => {
      const updated = [novoPedido, ...prev];
      try {
        localStorage.setItem('doce_encomenda_pedidos', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setCurrentTab('dashboard');
  };

  const formatarMoeda = (val) => `R$ ${Number(val || 0).toFixed(2).replace('.', ',')}`;

  const totalReceita = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalSinais = orders
    .filter((o) => o.status !== 'Aguardando Sinal')
    .reduce((acc, curr) => acc + curr.depositAmount, 0);
  const pedidosEmProducao = orders.filter((o) => o.status === 'Em Produção').length;
  const pedidosProntos = orders.filter((o) => o.status === 'Pronto p/ Retirar').length;

  const filteredOrders = orders.filter((o) => {
    const term = searchQuery.toLowerCase();
    return (
      o.clientName.toLowerCase().includes(term) ||
      o.id.toLowerCase().includes(term) ||
      o.items.some((i) => i.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans transition-colors duration-200">
      {/* Sidebar Retrátil */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Área Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewOrder={handleNewOrder}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {/* ABA 1: PAINEL GERAL & ESTEIRA KANBAN */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl font-serif font-black text-brand-text tracking-tight">
                    Fluxo de Produção & Esteira
                  </h1>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Organização lateral com movimentação de encomendas entre etapas da confeitaria.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Faturamento Previsto"
                  value={formatarMoeda(totalReceita)}
                  subtitle={`${orders.length} pedidos ativos`}
                  icon={DollarSign}
                />
                <KpiCard
                  title="Sinais em Caixa (50%)"
                  value={formatarMoeda(totalSinais)}
                  subtitle="PIX garantido em conta"
                  icon={Wallet}
                />
                <KpiCard
                  title="Na Esteira de Produção"
                  value={pedidosEmProducao.toString()}
                  subtitle="Bancada em preparo"
                  icon={ChefHat}
                />
                <KpiCard
                  title="Prontos p/ Retirada"
                  value={pedidosProntos.toString()}
                  subtitle="Embalados com laço"
                  icon={CheckCircle2}
                />
              </div>

              <section className="space-y-3 pt-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-brand-primary">
                  Etapas da Esteira
                </h2>
                <OrderKanban
                  orders={filteredOrders}
                  onStatusChange={handleStatusChange}
                />
              </section>
            </div>
          )}

          {/* ABA 2: CARDÁPIO & RECEITAS */}
          {currentTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl font-serif font-black text-brand-text tracking-tight">
                    Cardápio & Fichas Técnicas
                  </h1>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Produtos cadastrados, rendimentos, precificação e ingredientes de cada receita.
                  </p>
                </div>
              </div>

              <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-surfaceSubtle text-brand-muted uppercase text-[10px] tracking-wider border-b border-brand-border">
                      <tr>
                        <th className="p-4 font-black">Produto</th>
                        <th className="p-4 font-black">Categoria</th>
                        <th className="p-4 font-black">Preço</th>
                        <th className="p-4 font-black">Rendimento</th>
                        <th className="p-4 font-black">Receita Base</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-brand-surfaceSubtle/50 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-brand-text block">{prod.nome}</span>
                            <span className="text-[10px] text-brand-muted font-mono">ID: {prod.id}</span>
                          </td>
                          <td className="p-4 capitalize">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-surfaceSubtle border border-brand-border text-brand-primary">
                              {prod.categoria}
                            </span>
                          </td>
                          <td className="p-4 font-serif font-black text-brand-primary text-sm">
                            {formatarMoeda(prod.preco)}
                          </td>
                          <td className="p-4 text-brand-muted">
                            {prod.rendimento}
                          </td>
                          <td className="p-4 text-[11px] text-brand-text max-w-xs truncate">
                            {prod.receita}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: AGENDA DE RETIRADAS */}
          {currentTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-serif font-black text-brand-text tracking-tight">
                  Agenda de Retiradas
                </h1>
                <p className="text-xs text-brand-muted mt-0.5">
                  Organização por janelas de horário para separação antecipada dos pedidos.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[
                  { titulo: 'Manhã (10h às 12h)', key: 'Manhã', Icon: Sun },
                  { titulo: 'Tarde (14h às 16h30)', key: 'Tarde', Icon: Coffee },
                  { titulo: 'Fim de Tarde (17h às 19h)', key: 'Fim de Tarde', Icon: Sunset }
                ].map((jan, idx) => {
                  const Icon = jan.Icon;
                  const pedidosJanela = orders.filter((p) => p.pickupWindow.includes(jan.key));

                  return (
                    <div key={idx} className="bg-brand-surface border border-brand-border p-5 rounded-2xl space-y-4 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-brand-primary" />
                          <h3 className="font-bold text-xs text-brand-text">{jan.titulo}</h3>
                        </div>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-brand-surfaceSubtle border border-brand-border text-brand-primary font-mono">
                          {pedidosJanela.length}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {pedidosJanela.length === 0 ? (
                          <p className="text-center py-8 text-brand-muted text-xs">Nenhuma retirada programada</p>
                        ) : (
                          pedidosJanela.map((p) => (
                            <div key={p.id} className="p-3 rounded-xl bg-brand-surfaceSubtle border border-brand-border/60 flex items-center justify-between text-xs">
                              <div>
                                <strong className="block text-brand-text">{p.clientName}</strong>
                                <span className="text-[10px] text-brand-muted">{p.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-brand-primary font-mono">{p.id}</span>
                                <span className="block text-[11px] font-bold text-emerald-600">{p.status}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 4: CLIENTES VIP */}
          {currentTab === 'clients' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-serif font-black text-brand-text tracking-tight">
                  Diretório de Clientes VIP
                </h1>
                <p className="text-xs text-brand-muted mt-0.5">
                  Histórico consolidado de pedidos, valores investidos e contato direto no WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((c, i) => (
                  <div key={i} className="bg-brand-surface border border-brand-border p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-brand-text">{c.clientName}</h3>
                        <span className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-brand-primary" /> {c.clientPhone}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                        VIP
                      </span>
                    </div>

                    <div className="p-3 bg-brand-surfaceSubtle rounded-xl border border-brand-border/60 text-xs">
                      <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Último Pedido ({c.id})</span>
                      <strong className="font-serif font-black text-brand-primary text-sm">{formatarMoeda(c.totalAmount)}</strong>
                    </div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=55${c.clientPhone.replace(/\D/g, '')}&text=Olá%20${encodeURIComponent(c.clientName)}!%20Aqui%20é%20da%20Netinha%20Gourmet!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Conversar no WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 5: RELATÓRIOS FINANCEIROS */}
          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-serif font-black text-brand-text tracking-tight">
                  Demonstrativo Financeiro & Caixa
                </h1>
                <p className="text-xs text-brand-muted mt-0.5">
                  Controle dos sinais de 50% pagos via PIX e saldo restante a receber na entrega.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Faturamento Bruto</span>
                  <p className="text-2xl font-serif font-black text-brand-text mt-1">{formatarMoeda(totalReceita)}</p>
                  <span className="text-[11px] text-brand-muted mt-2 block">Soma de todas as encomendas</span>
                </div>

                <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Sinais Garantidos (50%)</span>
                  <p className="text-2xl font-serif font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatarMoeda(totalSinais)}</p>
                  <span className="text-[11px] text-brand-muted mt-2 block">Em conta corrente (PIX)</span>
                </div>

                <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">A Receber na Retirada</span>
                  <p className="text-2xl font-serif font-black text-brand-primary mt-1">{formatarMoeda(totalReceita - totalSinais)}</p>
                  <span className="text-[11px] text-brand-muted mt-2 block">Pagamento no ato da entrega</span>
                </div>
              </div>

              <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-base text-brand-text">
                  Demonstrativo por Pedido
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-surfaceSubtle text-brand-muted uppercase text-[10px] tracking-wider border-b border-brand-border">
                      <tr>
                        <th className="p-3 font-black">Código</th>
                        <th className="p-3 font-black">Cliente</th>
                        <th className="p-3 font-black">Total</th>
                        <th className="p-3 font-black">Sinal Pago (50%)</th>
                        <th className="p-3 font-black">Restante na Entrega</th>
                        <th className="p-3 font-black">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {orders.map((p) => (
                        <tr key={p.id} className="hover:bg-brand-surfaceSubtle/50 transition-colors">
                          <td className="p-3 font-mono font-bold text-brand-primary">{p.id}</td>
                          <td className="p-3 font-bold text-brand-text">{p.clientName}</td>
                          <td className="p-3 font-serif font-bold text-brand-text">{formatarMoeda(p.totalAmount)}</td>
                          <td className="p-3 font-serif font-bold text-emerald-600">{formatarMoeda(p.depositAmount)}</td>
                          <td className="p-3 font-serif font-bold text-brand-primary">{formatarMoeda(p.remainingAmount)}</td>
                          <td className="p-3 font-bold">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${p.status === 'Concluído' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
