// ==========================================
// BANCO DE DADOS LOCAL (STORAGE) & ESTADOS
// ==========================================
let pedidos = JSON.parse(localStorage.getItem("doce_encomenda_pedidos")) || [
  {
    id: "DOCE-101",
    clientName: "Maria Silva",
    clientPhone: "11999999999",
    items: [{ name: "Bolo Clássico 1.5kg", quantity: 1, price: 120.00 }],
    totalAmount: 120.00,
    depositAmount: 60.00,
    remainingAmount: 60.00,
    status: "Aguardando Sinal", // Opções: "Aguardando Sinal", "Em Produção", "Pronto", "Concluído"
    pickupDate: new Date().toISOString().split('T')[0],
    pickupWindow: "Tarde (14h - 17h)",
    createdAt: new Date().toISOString()
  },
  {
    id: "DOCE-102",
    clientName: "João Santos",
    clientPhone: "11988888888",
    items: [{ name: "Bolo Red Velvet", quantity: 1, price: 140.00 }],
    totalAmount: 140.00,
    depositAmount: 70.00,
    remainingAmount: 70.00,
    status: "Em Produção",
    pickupDate: new Date().toISOString().split('T')[0],
    pickupWindow: "Manhã (09h - 12h)",
    createdAt: new Date().toISOString()
  }
];

// Mapeamento de Ingredientes por Produto (Para o Gerador JIT)
const receitaIngredientes = {
  "Bolo Clássico 1.5kg": [
    { name: "Leite Condensado", quantity: 3, unit: "latas" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Ovos", quantity: 4, unit: "unidades" },
    { name: "Manteiga", quantity: 200, unit: "g" }
  ],
  "Bolo Red Velvet": [
    { name: "Cream Cheese", quantity: 2, unit: "potes" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Cacau em Pó", quantity: 100, unit: "g" },
    { name: "Açúcar Refinado", quantity: 300, unit: "g" }
  ],
  "Cento de Brigadeiros Tradicionais": [
    { name: "Leite Condensado", quantity: 8, unit: "latas" },
    { name: "Cacau em Pó", quantity: 200, unit: "g" },
    { name: "Manteiga", quantity: 100, unit: "g" },
    { name: "Granulado Belga", quantity: 300, unit: "g" }
  ],
  "Combo Festa": [
    { name: "Leite Condensado", quantity: 11, unit: "latas" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Ovos", quantity: 4, unit: "unidades" },
    { name: "Manteiga", quantity: 300, unit: "g" }
  ]
};

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const hoje = new Date().toISOString().split('T')[0];
  const inputData = document.getElementById("filtroDataAdmin");
  if (inputData) {
    inputData.value = hoje;
  }
  
  carregarPedidosAdmin();
});

// Salvar no LocalStorage
function salvarNoStorage() {
  localStorage.setItem("doce_encomenda_pedidos", JSON.stringify(pedidos));
}

// ==========================================
// RENDERIZAÇÃO DO PAINEL (KANBAN & MÉTRICAS)
// ==========================================
function definirDataHoje() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById("filtroDataAdmin").value = hoje;
  carregarPedidosAdmin();
}

function carregarPedidosAdmin() {
  const dataSelecionada = document.getElementById("filtroDataAdmin").value;
  
  // Filtrar pedidos do dia selecionado
  const pedidosDoDia = pedidos.filter(p => p.pickupDate === dataSelecionada);

  atualizarMetricas(pedidosDoDia);
  renderizarKanban(pedidosDoDia);
}

function atualizarMetricas(pedidosDoDia) {
  const totalRetiradas = pedidosDoDia.length;
  
  // Caixa previsto: soma dos saldos restantes de pedidos não concluídos do dia
  const caixaPrevisto = pedidosDoDia
    .filter(p => p.status !== "Concluído")
    .reduce((sum, p) => sum + p.remainingAmount, 0);

  // Em produção
  const emProducao = pedidosDoDia.filter(p => p.status === "Em Produção").length;

  // Próxima retirada
  const proximoPedido = pedidosDoDia.find(p => p.status !== "Concluído");

  document.getElementById("metricaRetiradas").textContent = totalRetiradas;
  document.getElementById("metricaCaixa").textContent = `R$ ${caixaPrevisto.toFixed(2).replace('.', ',')}`;
  document.getElementById("metricaProducao").textContent = emProducao;
  document.getElementById("metricaProximo").textContent = proximoPedido ? `${proximoPedido.clientName} (${proximoPedido.pickupWindow.split(' ')[0]})` : "Nenhum";
}

function renderizarKanban(pedidosDoDia) {
  const container = document.getElementById("gridKanban");
  if (!container) return;

  const colunas = [
    { titulo: "Aguardando Sinal", statusKey: "Aguardando Sinal", corBorda: "border-amber-500/30", corBadge: "bg-amber-500/20 text-amber-300" },
    { titulo: "Em Produção", statusKey: "Em Produção", corBorda: "border-indigo-500/30", corBadge: "bg-indigo-500/20 text-indigo-300" },
    { titulo: "Pronto p/ Retirar", statusKey: "Pronto", corBorda: "border-teal-500/30", corBadge: "bg-teal-500/20 text-teal-300" },
    { titulo: "Concluído", statusKey: "Concluído", corBorda: "border-emerald-500/30", corBadge: "bg-emerald-500/20 text-emerald-300" }
  ];

  container.innerHTML = colunas.map(col => {
    const itensColuna = pedidosDoDia.filter(p => p.status === col.statusKey);

    return `
      <div class="glass-panel p-3.5 rounded-2xl border ${col.corBorda} flex flex-col gap-3 min-h-[350px]">
        <div class="flex items-center justify-between pb-2 border-b border-white/5">
          <span class="text-xs font-bold text-white">${col.titulo}</span>
          <span class="px-2 py-0.5 rounded-full ${col.corBadge} text-[10px] font-extrabold">${itensColuna.length}</span>
        </div>

        <div class="space-y-2.5 flex-1 overflow-y-auto no-scrollbar">
          ${itensColuna.length === 0 ? `
            <div class="text-center py-10 text-slate-500 text-xs">Nenhum pedido</div>
          ` : itensColuna.map(pedido => `
            <div class="glass-panel p-3 rounded-xl border border-white/10 space-y-2 bg-slate-900/60 card-touch">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] text-[#E29578] font-bold">${pedido.id}</span>
                <span class="text-[10px] text-slate-400">⏰ ${pedido.pickupWindow.split(' ')[0]}</span>
              </div>

              <div>
                <h4 class="text-xs font-bold text-white">${pedido.clientName}</h4>
                <p class="text-[10px] text-slate-400 mt-0.5">${pedido.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
              </div>

              <div class="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span class="text-slate-300">Sinal: <strong class="text-emerald-400">R$ ${pedido.depositAmount.toFixed(2).replace('.', ',')}</strong></span>
                <span class="text-slate-400">Resto: R$ ${pedido.remainingAmount.toFixed(2).replace('.', ',')}</span>
              </div>

              <!-- Controles de Mudança de Status Manual -->
              <div class="pt-1 flex items-center gap-1">
                ${pedido.status !== "Aguardando Sinal" ? `
                  <button onclick="mudarStatus('${pedido.id}', 'voltar')" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold" title="Voltar Status">←</button>
                ` : ''}
                
                <button onclick="mudarStatus('${pedido.id}', 'avancar')" class="flex-1 py-1.5 rounded bg-gradient-to-r from-[#8C4A32] to-[#E29578] text-slate-950 font-extrabold text-[10px] text-center shadow-sm">
                  ${pedido.status === "Aguardando Sinal" ? 'Confirmar Sinal (Pix) →' : pedido.status === "Em Produção" ? 'Marcar Pronto →' : pedido.status === "Pronto" ? 'Concluir Pedido ✓' : 'Concluído'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// ALTERAÇÃO MANUAL DE STATUS
// ==========================================
function mudarStatus(idPedido, direcao) {
  const pedido = pedidos.find(p => p.id === idPedido);
  if (!pedido) return;

  const fluxo = ["Aguardando Sinal", "Em Produção", "Pronto", "Concluído"];
  const indexAtual = fluxo.indexOf(pedido.status);

  if (direcao === 'avancar' && indexAtual < fluxo.length - 1) {
    pedido.status = fluxo[indexAtual + 1];
  } else if (direcao === 'voltar' && indexAtual > 0) {
    pedido.status = fluxo[indexAtual - 1];
  }

  salvarNoStorage();
  carregarPedidosAdmin();
}

// ==========================================
// NOVO PEDIDO MANUAL (BALCÃO / WHATSAPP)
// ==========================================
function abrirModalBalcao() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById("bData").value = hoje;
  document.getElementById("modalBalcao").classList.remove("hidden");
}

function fecharModalBalcao() {
  document.getElementById("modalBalcao").classList.add("hidden");
}

function salvarPedidoBalcao(event) {
  event.preventDefault();

  const nome = document.getElementById("bNome").value.trim();
  const fone = document.getElementById("bFone").value.trim();
  const produtoNome = document.getElementById("bProduto").value;
  const data = document.getElementById("bData").value;
  const janela = document.getElementById("bJanela").value;

  // Preço base simulado por produto
  const precos = {
    "Bolo Clássico 1.5kg": 120.00,
    "Bolo Red Velvet": 140.00,
    "Cento de Brigadeiros Tradicionais": 90.00,
    "Combo Festa": 170.00
  };

  const precoTotal = precos[produtoNome] || 120.00;
  const sinal = precoTotal / 2;

  const novoPedido = {
    id: `#DOCE-${Math.floor(100 + Math.random() * 900)}`,
    clientName: nome,
    clientPhone: fone,
    items: [{ name: produtoNome, quantity: 1, price: precoTotal }],
    totalAmount: precoTotal,
    depositAmount: sinal,
    remainingAmount: sinal,
    status: "Aguardando Sinal",
    pickupDate: data,
    pickupWindow: janela,
    createdAt: new Date().toISOString()
  };

  pedidos.push(novoPedido);
  salvarNoStorage();
  fecharModalBalcao();
  carregarPedidosAdmin();

  // Limpar formulário
  document.getElementById("formBalcao").reset();
}

// ==========================================
// GERADOR DE LISTA DE COMPRAS (JIT - 7 DIAS)
// ==========================================
function abrirModalCompras() {
  calcularListaComprasJIT();
  document.getElementById("modalCompras").classList.remove("hidden");
}

function fecharModalCompras() {
  document.getElementById("modalCompras").classList.add("hidden");
}

function calcularListaComprasJIT() {
  const container = document.getElementById("listaIngredientesJIT");
  if (!container) return;

  // Considerar pedidos dos próximos 7 dias que estejam "Em Produção" ou "Pronto" (já com sinal confirmado)
  const hoje = new Date();
  const daqui7Dias = new Date();
  daqui7Dias.setDate(hoje.getDate() + 7);

  const dataHojeStr = hoje.toISOString().split('T')[0];
  const dataLimiteStr = daqui7Dias.toISOString().split('T')[0];

relevantPedidos = pedidos.filter(p => {
    return p.pickupDate >= dataHojeStr && p.pickupDate <= dataLimiteStr && (p.status === "Em Produção" || p.status === "Pronto" || p.status === "Aguardando Sinal");
  });

  // Consolidar ingredientes
  const consolidador = {};

  relevantPedidos.forEach(pedido => {
    pedido.items.forEach(item => {
      const receita = receitaIngredientes[item.name];
      if (receita) {
        receita.forEach(ing => {
          const chave = `${ing.name} (${ing.unit})`;
          const qtdTotal = ing.quantity * item.quantity;
          if (consolidador[chave]) {
            consolidador[chave] += qtdTotal;
          } else {
            consolidador[chave] = qtdTotal;
          }
        });
      }
    });
  });

  const chavesIngredientes = Object.keys(consolidador);

  if (chavesIngredientes.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-500 py-6">Nenhum ingrediente necessário para os próximos 7 dias.</p>`;
    return;
  }

  container.innerHTML = `
    <p class="text-[11px] text-slate-400 mb-2">Soma dos ingredientes calculada Just-In-Time com base nos pedidos confirmados da semana:</p>
    <div class="space-y-1.5">
      ${chavesIngredientes.map(ing => `
        <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/5">
          <span class="font-bold text-white">✅ ${ing}</span>
          <span class="font-mono text-amber-300 font-extrabold">${consolidador[ing]}</span>
        </div>
      `).join('')}
    </div>
  `;
}