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
const RECEITAS_LEGADO = {
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

let catalogo = carregarCatalogo();
let receitaIngredientes = carregarReceitas();

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  aplicarTemaAdmin(localStorage.getItem('doce_encomenda_tema') || 'light');

  const hoje = new Date().toISOString().split('T')[0];
  const inputData = document.getElementById("filtroDataAdmin");
  if (inputData) {
    inputData.value = hoje;
  }
  
  carregarPedidosAdmin();
});

// ==========================================
// TEMA CLARO/ESCURO (compartilhado com o portal)
// ==========================================
function aplicarTemaAdmin(tema) {
  const temaAtual = tema === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = temaAtual;
  document.documentElement.classList.toggle('dark', temaAtual === 'dark');
  localStorage.setItem('doce_encomenda_tema', temaAtual);

  const icone = document.getElementById('themeIconAdmin');
  const botao = document.getElementById('themeToggle');
  if (icone) {
    icone.innerHTML = temaAtual === 'light'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"/></svg>';
  }
  if (botao) botao.setAttribute('aria-label', temaAtual === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro');
}

function alternarTemaAdmin() {
  const temaAtual = document.documentElement.dataset.theme || 'light';
  aplicarTemaAdmin(temaAtual === 'light' ? 'dark' : 'light');
}

// Salvar no LocalStorage
function salvarNoStorage() {
  localStorage.setItem("doce_encomenda_pedidos", JSON.stringify(pedidos));
}

function escaparHtml(valor) {
  return String(valor || '').replace(/[&<>'"]/g, caractere => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[caractere]));
}

function abrirModalCatalogo() {
  renderizarListaCatalogoAdmin();
  atualizarOpcoesProdutoBalcao();
  document.getElementById("modalCatalogo").classList.remove("hidden");
  if (!document.getElementById("catalogoId").value) novoProdutoCatalogo();
}

function fecharModalCatalogo() {
  document.getElementById("modalCatalogo").classList.add("hidden");
}

function renderizarListaCatalogoAdmin() {
  const container = document.getElementById("listaCatalogoAdmin");
  if (!container) return;

  container.innerHTML = catalogo.map(produto => `
    <button type="button" onclick="editarProdutoCatalogo('${produto.id}')" class="interactive-card w-full text-left p-2.5 rounded-xl bg-black/15 hover:bg-white/5 border border-white/10 flex items-center gap-2.5">
      <span class="w-9 h-9 rounded-lg bg-white/5 text-[#C84328] flex items-center justify-center shrink-0">${iconeCategoriaProduto(produto.categoria)}</span>
      <span class="min-w-0 flex-1">
        <strong class="block text-xs text-white truncate">${escaparHtml(produto.nome)}</strong>
        <span class="block text-[10px] text-slate-400 mt-0.5">${escaparHtml(produto.categoria)} · R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</span>
      </span>
      <span class="text-slate-500 text-xs">›</span>
    </button>
  `).join('');
}

function iconeCategoriaProduto(categoria) {
  const desenhos = {
    bolos: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 13h16l-2 7H6l-2-7Zm1 0V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M9 7V4m6 3V4"/>',
    doces: '<circle cx="12" cy="12" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 13 2.5 2.5L16 9"/>',
    balas: '<path stroke-linecap="round" stroke-linejoin="round" d="m3 9 4 3-4 3V9Zm18 0-4 3 4 3V9ZM7 9h10v6H7z"/>',
    combos: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 9h18v12H3zM2 5h20v4H2zm10 0v16m0-16c-4-1-5-5-2-5 2 0 2 5 2 5Zm0 0c4-1 5-5 2-5-2 0-2 5-2 5Z"/>'
  };
  return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${desenhos[categoria] || desenhos.combos}</svg>`;
}

function novoProdutoCatalogo() {
  document.getElementById("formCatalogo").reset();
  document.getElementById("catalogoId").value = '';
  document.getElementById("tituloFormCatalogo").textContent = 'Novo produto';
  document.getElementById("btnExcluirCatalogo").classList.add('hidden');
}

function limparFormCatalogo() {
  novoProdutoCatalogo();
}

function editarProdutoCatalogo(id) {
  const produto = catalogo.find(item => item.id === id);
  if (!produto) return;

  document.getElementById("catalogoId").value = produto.id;
  document.getElementById("catalogoNome").value = produto.nome;
  document.getElementById("catalogoCategoria").value = produto.categoria;
  document.getElementById("catalogoPreco").value = produto.preco;
  document.getElementById("catalogoBadge").value = produto.badge || '';
  document.getElementById("catalogoRendimento").value = produto.rendimento || '';
  document.getElementById("catalogoDescricao").value = produto.descricao || '';
  document.getElementById("catalogoReceita").value = (receitaIngredientes[id] || [])
    .map(ingrediente => `${ingrediente.name} | ${ingrediente.quantity} | ${ingrediente.unit}`).join('\n');
  document.getElementById("tituloFormCatalogo").textContent = 'Editar produto';
  document.getElementById("btnExcluirCatalogo").classList.remove('hidden');
}

function lerReceitaDoFormulario() {
  return document.getElementById("catalogoReceita").value.split('\n')
    .map(linha => linha.split('|').map(parte => parte.trim()))
    .filter(partes => partes.length >= 3 && partes[0] && Number(partes[1]) > 0 && partes[2])
    .map(partes => ({ name: partes[0], quantity: Number(partes[1]), unit: partes[2] }));
}

function salvarProdutoCatalogo(event) {
  event.preventDefault();

  const idAtual = document.getElementById("catalogoId").value;
  const produto = {
    id: idAtual || `p-${Date.now()}`,
    nome: document.getElementById("catalogoNome").value.trim(),
    categoria: document.getElementById("catalogoCategoria").value,
    preco: Number(document.getElementById("catalogoPreco").value),
    descricao: document.getElementById("catalogoDescricao").value.trim(),
    badge: document.getElementById("catalogoBadge").value.trim() || 'Artesanal',
    rendimento: document.getElementById("catalogoRendimento").value.trim() || 'Feito sob encomenda'
  };

  if (idAtual) {
    catalogo = catalogo.map(item => item.id === idAtual ? produto : item);
  } else {
    catalogo.push(produto);
  }

  receitaIngredientes[produto.id] = lerReceitaDoFormulario();
  salvarCatalogo(catalogo);
  salvarReceitas(receitaIngredientes);
  renderizarListaCatalogoAdmin();
  atualizarOpcoesProdutoBalcao();
  novoProdutoCatalogo();
  alert('Produto e receita salvos no cardápio.');
}

function excluirProdutoCatalogo() {
  const idAtual = document.getElementById("catalogoId").value;
  const produto = catalogo.find(item => item.id === idAtual);
  if (!produto || !confirm(`Excluir "${produto.nome}" do cardápio?`)) return;

  catalogo = catalogo.filter(item => item.id !== idAtual);
  delete receitaIngredientes[idAtual];
  salvarCatalogo(catalogo);
  salvarReceitas(receitaIngredientes);
  renderizarListaCatalogoAdmin();
  atualizarOpcoesProdutoBalcao();
  novoProdutoCatalogo();
}

function atualizarOpcoesProdutoBalcao() {
  const select = document.getElementById("bProduto");
  if (!select) return;
  const valorAtual = select.value;
  select.innerHTML = catalogo.map(produto => `
    <option value="${escaparHtml(produto.id)}">${escaparHtml(produto.nome)} (R$ ${Number(produto.preco).toFixed(2).replace('.', ',')})</option>
  `).join('');
  if (catalogo.some(produto => produto.id === valorAtual)) select.value = valorAtual;
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
            <div class="glass-panel p-3 rounded-xl border border-white/10 space-y-2 bg-slate-900/60 card-touch interactive-card">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] text-[#C84328] font-bold">${pedido.id}</span>
                <span class="text-[10px] text-slate-400 inline-flex items-center gap-1">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2"/></svg>
                  ${escaparHtml(pedido.pickupWindow.split(' ')[0])}
                </span>
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
                  <button onclick="mudarStatus('${pedido.id}', 'voltar')" class="interactive-control px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold" title="Voltar Status">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7 7-7-7 7-7"/></svg>
                  </button>
                ` : ''}
                
                <button onclick="mudarStatus('${pedido.id}', 'avancar')" class="interactive-control flex-1 py-1.5 rounded bg-[#C84328] hover:bg-[#AE351F] text-white font-extrabold text-[10px] text-center shadow-sm inline-flex items-center justify-center gap-1">
                  <span>${pedido.status === "Aguardando Sinal" ? 'Confirmar Sinal (Pix)' : pedido.status === "Em Produção" ? 'Marcar Pronto' : pedido.status === "Pronto" ? 'Concluir Pedido' : 'Concluído'}</span>
                  ${pedido.status === "Pronto" ? '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6"/></svg>' : pedido.status === "Concluído" ? '' : '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7 7 7-7 7"/></svg>'}
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
  atualizarOpcoesProdutoBalcao();
  document.getElementById("modalBalcao").classList.remove("hidden");
}

function fecharModalBalcao() {
  document.getElementById("modalBalcao").classList.add("hidden");
}

function salvarPedidoBalcao(event) {
  event.preventDefault();

  const nome = document.getElementById("bNome").value.trim();
  const fone = document.getElementById("bFone").value.trim();
  const produtoId = document.getElementById("bProduto").value;
  const produto = catalogo.find(item => item.id === produtoId) || catalogo[0];
  const produtoNome = produto ? produto.nome : 'Produto artesanal';
  const data = document.getElementById("bData").value;
  const janela = document.getElementById("bJanela").value;

  const precoTotal = produto ? Number(produto.preco) : 0;
  const sinal = precoTotal / 2;

  const novoPedido = {
    id: `#DOCE-${Math.floor(100 + Math.random() * 900)}`,
    clientName: nome,
    clientPhone: fone,
    items: [{ productId, name: produtoNome, quantity: 1, price: precoTotal }],
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
      const produto = catalogo.find(itemCatalogo => itemCatalogo.id === item.productId || itemCatalogo.nome === item.name);
      const receita = receitaIngredientes[item.productId] || (produto && receitaIngredientes[produto.id]) || receitaIngredientes[item.name];
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
          <span class="font-bold text-white inline-flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6"/></svg>
            ${escaparHtml(ing)}
          </span>
          <span class="font-mono text-amber-300 font-extrabold">${consolidador[ing]}</span>
        </div>
      `).join('')}
    </div>
  `;
}