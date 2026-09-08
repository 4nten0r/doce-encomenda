// ===================================================
// DOCE ENCOMENDA - MOTOR DO PORTAL DO CLIENTE (VIP)
// ===================================================

// CATÁLOGO DE PRODUTOS COMPLETO & CATEGORIZADO
const CATALOGO_LEGADO = [
  {
    id: "p1",
    nome: "Bolo Clássico Ninho c/ Morangos (1.5kg)",
    categoria: "bolos",
    preco: 120.00,
    descricao: "Massa amanteigada artesanal, recheio generoso de leite ninho e morangos frescos selecionados.",
    emoji: "🎂",
    badge: "Mais Pedido",
    rendimento: "Serve até 15 pessoas"
  },
  {
    id: "p2",
    nome: "Bolo Red Velvet Nobre (1.5kg)",
    categoria: "bolos",
    preco: 140.00,
    descricao: "Veludo vermelho com autêntico recheio e cobertura de cream cheese frosting com toque de baunilha.",
    emoji: "🍰",
    badge: "Assinatura",
    rendimento: "Serve até 15 pessoas"
  },
  {
    id: "p3",
    nome: "Bolo Pistache & Frutas Vermelhas (1.5kg)",
    categoria: "bolos",
    preco: 160.00,
    descricao: "Massa fofa de pistache puro, ganache montada e geleia artesanal de frutas vermelhas.",
    emoji: "🧁",
    badge: "Gourmet",
    rendimento: "Serve até 15 pessoas"
  },
  {
    id: "p4",
    nome: "Caixa 50 Brigadeiros Belga Nobre",
    categoria: "doces",
    preco: 75.00,
    descricao: "Blend nobre de chocolate Callebaut 54% cacau enrolado em blossoms belgas.",
    emoji: "🍫",
    badge: "100% Callebaut",
    rendimento: "50 unidades artesanais"
  },
  {
    id: "p5",
    nome: "Cento de Brigadeiros Tradicionais",
    categoria: "doces",
    preco: 90.00,
    descricao: "Cento variado com brigadeiro tradicional, beijinho de coco queimado e dois amores.",
    emoji: "🍬",
    badge: "Favorito Festa",
    rendimento: "100 unidades"
  },
  {
    id: "p6",
    nome: "Box Degustação 16 Doces Finos",
    categoria: "doces",
    preco: 68.00,
    descricao: "Seleção luxuosa: Trufas douradas, camafeu de nozes e mini torteletes.",
    emoji: "🎀",
    badge: "Presente VIP",
    rendimento: "16 unidades sortidas"
  },
  {
    id: "p7",
    nome: "Combo Festa Completa (Bolo + 50 Doces)",
    categoria: "combos",
    preco: 170.00,
    descricao: "Bolo Clássico 1.5kg à sua escolha + 50 Brigadeiros Gourmet na caixa de presente.",
    emoji: "✨",
    badge: "Economize R$ 25",
    rendimento: "Ideal p/ 15 convidados"
  },
  {
    id: "p8",
    nome: "Combo Petit Celebration",
    categoria: "combos",
    preco: 135.00,
    descricao: "Bolo aro 15 (1kg) + 25 docinhos gourmet variados em embalagem especial.",
    emoji: "🥂",
    badge: "Intimista",
    rendimento: "Ideal p/ 8 a 10 convidados"
  }
];

let PRODUTOS = carregarCatalogo();

// ESTADO DO APLICATIVO
let carrinho = {}; // Mapeamento { [produtoId]: quantidade }
let categoriaAtiva = 'todos';
let dadosCliente = {
  nome: '',
  whats: '',
  data: '',
  hora: 'Tarde (14h - 16h30)',
  obs: ''
};
let codigoPedidoGerado = '';

// ===================================================
// SISTEMA DE ÁUDIO SUAVE (Sintetizador Web Audio)
// ===================================================
let audioCtx = null;
function playSweetPop(freq = 620, duration = 0.08) {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// ===================================================
// CONTROLE DE TELAS & NAVEGAÇÃO
// ===================================================
function goTo(screenId) {
  playSweetPop();

  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active-screen');
    el.classList.add('hidden-screen');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.remove('hidden-screen');
    target.classList.add('active-screen');
  }

  atualizarStepper(screenId);
}

function atualizarStepper(screenId) {
  const s1 = document.getElementById('step-1');
  const s2 = document.getElementById('step-2');
  const s3 = document.getElementById('step-3');

  if (!s1 || !s2 || !s3) return;

  const resetStep = (el, num) => {
    el.className = 'flex items-center gap-1.5 text-brand-muted/60 transition-colors';
    el.querySelector('span:first-child').className = 'w-5 h-5 rounded-full bg-brand-surface border border-brand-border text-brand-muted flex items-center justify-center text-[10px] font-bold';
    el.querySelector('span:first-child').innerText = num;
  };

  const markActive = (el, num) => {
    el.className = 'flex items-center gap-1.5 text-brand-gold transition-colors font-bold';
    el.querySelector('span:first-child').className = 'w-5 h-5 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center text-[10px] font-black shadow-glow-gold';
    el.querySelector('span:first-child').innerText = num;
  };

  const markCompleted = (el) => {
    el.className = 'flex items-center gap-1.5 text-emerald-400 transition-colors';
    el.querySelector('span:first-child').className = 'w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px] font-black';
    el.querySelector('span:first-child').innerText = '✓';
  };

  resetStep(s1, '1');
  resetStep(s2, '2');
  resetStep(s3, '3');

  if (screenId === 'catalogo') {
    markActive(s1, '1');
  } else if (screenId === 'identificacao') {
    markCompleted(s1);
    markActive(s2, '2');
  } else if (screenId === 'pagamento' || screenId === 'comprovante') {
    markCompleted(s1);
    markCompleted(s2);
    markActive(s3, '3');
  }
}

// ===================================================
// RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
// ===================================================
function renderizarCatalogo() {
  const container = document.getElementById('listaProdutos');
  if (!container) return;

  const produtosFiltrados = categoriaAtiva === 'todos' 
    ? PRODUTOS 
    : PRODUTOS.filter(p => p.categoria === categoriaAtiva);

  container.innerHTML = produtosFiltrados.map(prod => {
    const qtd = carrinho[prod.id] || 0;

    return `
      <div class="glass-panel p-4 rounded-3xl border border-brand-border/60 hover:border-brand-gold/50 transition-all relative overflow-hidden group">
        <!-- Detalhe de luz sutil no canto -->
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/15 transition-all"></div>

        <div class="flex items-start justify-between gap-3 relative z-10">
          <div class="flex items-start gap-3.5 flex-1">
            <div class="w-14 h-14 rounded-2xl bg-brand-surface/90 border border-brand-border/40 flex items-center justify-center text-3xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              ${prod.emoji}
            </div>

            <div class="flex-1 pr-1">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                  ${prod.badge}
                </span>
                <span class="text-[10px] text-brand-muted font-medium">${prod.rendimento}</span>
              </div>

              <h3 class="font-serif font-bold text-sm text-white leading-snug">
                ${prod.nome}
              </h3>
              
              <p class="text-[11px] text-brand-muted mt-1 leading-relaxed line-clamp-2">
                ${prod.descricao}
              </p>

              <div class="mt-2.5 flex items-baseline gap-1.5">
                <span class="text-[10px] text-brand-muted">A partir de</span>
                <span class="font-serif font-black text-brand-gold text-base">
                  R$ ${prod.preco.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          <!-- Controle de Quantidade Integrado -->
          <div class="shrink-0 pt-2">
            ${qtd === 0 ? `
              <button onclick="alterarQuantidade('${prod.id}', 1)" class="w-10 h-10 rounded-2xl bg-brand-surface hover:bg-brand-gold hover:text-brand-dark text-brand-gold border border-brand-border/60 hover:border-brand-gold flex items-center justify-center text-lg font-bold shadow-md btn-touch transition-all" title="Adicionar ao Pedido">
                +
              </button>
            ` : `
              <div class="flex items-center bg-brand-surface border border-brand-gold/60 rounded-2xl p-1 shadow-glow-gold">
                <button onclick="alterarQuantidade('${prod.id}', -1)" class="w-7 h-7 rounded-xl bg-brand-dark/80 hover:bg-brand-card text-brand-gold flex items-center justify-center text-xs font-black btn-touch">
                  −
                </button>
                <span class="w-7 text-center font-black text-xs text-white">${qtd}</span>
                <button onclick="alterarQuantidade('${prod.id}', 1)" class="w-7 h-7 rounded-xl bg-brand-gold text-brand-dark flex items-center justify-center text-xs font-black btn-touch">
                  +
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filtrarCategoria(cat) {
  playSweetPop(750, 0.05);
  categoriaAtiva = cat;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = 'tab-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-brand-gold text-brand-dark shadow-sm whitespace-nowrap';
    } else {
      btn.className = 'tab-btn px-3.5 py-1.5 rounded-full text-xs font-medium text-brand-muted hover:text-white bg-brand-surface border border-brand-border/40 whitespace-nowrap transition-all';
    }
  });

  renderizarCatalogo();
}

// ===================================================
// GERENCIAMENTO DO CARRINHO & TOTAIS
// ===================================================
function alterarQuantidade(prodId, delta) {
  playSweetPop(delta > 0 ? 800 : 450, 0.06);

  const atual = carrinho[prodId] || 0;
  const novaQtd = atual + delta;

  if (novaQtd <= 0) {
    delete carrinho[prodId];
  } else {
    carrinho[prodId] = novaQtd;
  }

  atualizarInterfaceCarrinho();
  renderizarCatalogo();
}

function calcularTotais() {
  let total = 0;
  let totalItens = 0;

  Object.entries(carrinho).forEach(([id, qtd]) => {
    const prod = PRODUTOS.find(p => p.id === id);
    if (prod) {
      total += prod.preco * qtd;
      totalItens += qtd;
    }
  });

  return { total, totalItens };
}

function atualizarInterfaceCarrinho() {
  const { total, totalItens } = calcularTotais();

  // Badges e contadores
  const badgeTopo = document.getElementById('badgeCarrinhoTopo');
  const badgeQtd = document.getElementById('qtdItensBadge');
  const totalTxt = document.getElementById('totalCarrinho');
  const resumoSubtotal = document.getElementById('resumoSubtotal');

  if (badgeTopo) {
    badgeTopo.innerText = totalItens;
    if (totalItens > 0) {
      badgeTopo.classList.remove('scale-0');
      badgeTopo.classList.add('scale-100');
    } else {
      badgeTopo.classList.remove('scale-100');
      badgeTopo.classList.add('scale-0');
    }
  }

  if (badgeQtd) badgeQtd.innerText = totalItens;
  if (totalTxt) totalTxt.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
  if (resumoSubtotal) resumoSubtotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

  // Gaveta inferior de checkout
  const barra = document.getElementById('barraCarrinho');
  if (barra) {
    if (totalItens > 0) {
      barra.classList.remove('translate-y-full');
    } else {
      barra.classList.add('translate-y-full');
    }
  }
}

function focarCarrinho() {
  const { totalItens } = calcularTotais();
  if (totalItens === 0) {
    alert("Seu carrinho está vazio. Escolha pelo menos uma delícia do cardápio!");
  } else {
    irParaIdentificacao();
  }
}

function irParaIdentificacao() {
  const { totalItens } = calcularTotais();
  if (totalItens === 0) {
    alert("Escolha algum doce ou bolo antes de prosseguir!");
    return;
  }
  goTo('identificacao');
}

function voltarParaCatalogo() {
  goTo('catalogo');
}

// ===================================================
// MÁSCARA E VALIDAÇÃO DE IDENTIFICAÇÃO
// ===================================================
const mascaraTelefone = (valor) => {
  valor = valor.replace(/\D/g, "");
  if (valor.length > 11) valor = valor.slice(0, 11);
  if (valor.length > 6) return valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  if (valor.length > 2) return valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  return valor.replace(/^(\d*)/, "($1");
};

const inputWhats = document.getElementById('cliWhats');
if (inputWhats) {
  inputWhats.addEventListener('input', (e) => {
    e.target.value = mascaraTelefone(e.target.value);
  });
}

function validarEAvancarPagamento() {
  const nome = document.getElementById('cliNome').value.trim();
  const whats = document.getElementById('cliWhats').value.trim();
  const data = document.getElementById('cliData').value;
  const hora = document.getElementById('cliHora').value;
  const obs = document.getElementById('cliObs').value.trim();

  if (!nome) {
    alert("Por favor, digite seu nome completo.");
    document.getElementById('cliNome').focus();
    return;
  }
  if (whats.length < 14) {
    alert("Por favor, informe um WhatsApp válido com DDD.");
    document.getElementById('cliWhats').focus();
    return;
  }
  if (!data) {
    alert("Por favor, selecione a data desejada para a retirada.");
    document.getElementById('cliData').focus();
    return;
  }

  dadosCliente = { nome, whats, data, hora, obs };

  const { total } = calcularTotais();
  const sinal = total / 2;
  const restante = total - sinal;

  document.getElementById('valorSinal').innerText = `R$ ${sinal.toFixed(2).replace('.', ',')}`;
  document.getElementById('valorRestante').innerText = `R$ ${restante.toFixed(2).replace('.', ',')}`;

  // Atualiza QR Code dinâmico com valor
  const qrImg = document.getElementById('pixQrImg');
  if (qrImg) {
    const payloadPix = `00020126580014br.gov.bcb.pix0136confeitaria.doce.encomenda@pix.com.br520400005303986540${sinal.toFixed(2)}5802BR5914DOCE ENCOMENDA6009SAO PAULO62070503***6304`;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(payloadPix)}&color=160820&bgcolor=ffffff`;
  }

  goTo('pagamento');
}

function copiarPix() {
  playSweetPop(900, 0.08);
  const chaveChave = "00020126580014br.gov.bcb.pix0136confeitaria.doce.encomenda@pix.com.br52040000530398654060.005802BR5914DOCE ENCOMENDA6009SAO PAULO62070503***6304";
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(chaveChave);
  }

  const btn = document.getElementById('btnCopiarPix');
  const copyText = document.getElementById('copyText');
  const copyIcon = document.getElementById('copyIcon');

  copyText.innerText = "Código PIX Copiado com Sucesso! ✓";
  copyIcon.innerText = "✨";
  btn.classList.add('border-emerald-500', 'text-emerald-400', 'bg-emerald-500/10');

  setTimeout(() => {
    copyText.innerText = "Copiar Código PIX (Copia e Cola)";
    copyIcon.innerText = "📋";
    btn.classList.remove('border-emerald-500', 'text-emerald-400', 'bg-emerald-500/10');
  }, 3000);
}

// ===================================================
// FINALIZAÇÃO, TICKET VIP E INTEGRAÇÃO COM ADMIN
// ===================================================
function simularPagamento() {
  playSweetPop(600, 0.1);
  const btn = document.getElementById('btnConfirmarPix');
  btn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Validando sinal na rede bancária...
  `;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<span>Já Realizei o Pagamento</span>`;
    btn.disabled = false;
    gerarTicketFinal();
  }, 1400);
}

function gerarTicketFinal() {
  codigoPedidoGerado = "#DOCE-" + Math.floor(1000 + Math.random() * 9000);
  const { total } = calcularTotais();
  const sinal = total / 2;
  const restante = total - sinal;

  // Formatador de data
  const partes = dadosCliente.data.split('-');
  const dataFormatada = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : dadosCliente.data;

  // Atualiza visual do Ticket VIP
  document.getElementById('ticketNome').innerText = dadosCliente.nome;
  document.getElementById('ticketCodigo').innerText = codigoPedidoGerado;
  document.getElementById('ticketDataHora').innerText = `${dataFormatada} às ${dadosCliente.hora.split(' ')[0]}`;
  document.getElementById('ticketSinal').innerText = `R$ ${sinal.toFixed(2).replace('.', ',')}`;
  document.getElementById('ticketRestante').innerText = `R$ ${restante.toFixed(2).replace('.', ',')}`;

  // Itens comprados
  const containerItens = document.getElementById('ticketItensLista');
  const itensFormatadosParaAdmin = [];

  containerItens.innerHTML = Object.entries(carrinho).map(([id, qtd]) => {
    const p = PRODUTOS.find(prod => prod.id === id);
    if (!p) return '';
    itensFormatadosParaAdmin.push({
      productId: id,
      name: p.nome,
      quantity: qtd,
      price: p.preco
    });
    return `
      <div class="flex items-center justify-between text-[11px]">
        <span>&bull; ${qtd}x ${p.nome}</span>
        <span class="font-mono text-brand-gold font-bold">R$ ${(p.preco * qtd).toFixed(2).replace('.', ',')}</span>
      </div>
    `;
  }).join('');

  // Sincroniza pedido no LocalStorage (SCHEMA COMPATÍVEL COM ADMIN.JS!)
  const novoPedido = {
    id: codigoPedidoGerado,
    clientName: dadosCliente.nome,
    clientPhone: dadosCliente.whats,
    items: itensFormatadosParaAdmin,
    totalAmount: total,
    depositAmount: sinal,
    remainingAmount: restante,
    status: "Em Produção", // Já vai para 'Em Produção' pois o sinal acabou de ser aprovado!
    pickupDate: dadosCliente.data,
    pickupWindow: dadosCliente.hora,
    obs: dadosCliente.obs,
    createdAt: new Date().toISOString()
  };

  const pedidosSalvos = JSON.parse(localStorage.getItem('doce_encomenda_pedidos') || '[]');
  pedidosSalvos.unshift(novoPedido); // Adiciona no topo
  localStorage.setItem('doce_encomenda_pedidos', JSON.stringify(pedidosSalvos));

  goTo('comprovante');
  dispararChuvaDeConfetes();
}

function enviarParaWhatsApp() {
  playSweetPop();
  const { total } = calcularTotais();
  const sinal = total / 2;
  const restante = total - sinal;
  const partes = dadosCliente.data.split('-');
  const dataFormatada = partes.length === 3 ? `${partes[2]}/${partes[1]}` : dadosCliente.data;

  const itensTexto = Object.entries(carrinho).map(([id, qtd]) => {
    const p = PRODUTOS.find(prod => prod.id === id);
    return p ? `• ${qtd}x ${p.nome}` : '';
  }).join('%0A');

  const mensagem = `Olá, Doce Encomenda! 🧁%0A%0AAcabei de encomendar pelo portal e realizei o sinal de 50%!%0A%0A*Código do Pedido:* ${codigoPedidoGerado}%0A*Cliente:* ${dadosCliente.nome}%0A*Data/Hora Retirada:* ${dataFormatada} às ${dadosCliente.hora}%0A%0A*Itens Solicitados:*%0A${itensTexto}%0A%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}%0A*Sinal Pago:* R$ ${sinal.toFixed(2).replace('.', ',')}%0A*Restante na Retirada:* R$ ${restante.toFixed(2).replace('.', ',')}%0A%0APor favor, confirmem o recebimento! Muito obrigado(a)!`;

  window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${mensagem}`, '_blank');
}

function resetarApp() {
  carrinho = {};
  categoriaAtiva = 'todos';
  dadosCliente = { nome: '', whats: '', data: '', hora: 'Tarde (14h - 16h30)', obs: '' };

  document.getElementById('cliNome').value = '';
  document.getElementById('cliWhats').value = '';
  document.getElementById('cliObs').value = '';

  atualizarInterfaceCarrinho();
  renderizarCatalogo();
  goTo('catalogo');
}

// ===================================================
// MOTOR DE CONFETES NATIVO DE ALTA PERFORMANCE (60 FPS)
// ===================================================
function dispararChuvaDeConfetes() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cores = ['#F3BA62', '#FDE4B0', '#F472B6', '#E11D48', '#10B981', '#FFF8F0'];
  const totalConfetes = 90;
  const confetes = [];

  for (let i = 0; i < totalConfetes; i++) {
    confetes.push({
      x: canvas.width / 2 + (Math.random() * 120 - 60),
      y: canvas.height / 2 + 50,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.85) * 20,
      tamanho: Math.random() * 9 + 4,
      cor: cores[Math.floor(Math.random() * cores.length)],
      rotacao: Math.random() * 360,
      vRotacao: (Math.random() - 0.5) * 12,
      opacidade: 1,
      isStar: Math.random() > 0.6
    });
  }

  let animId;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let vivos = 0;

    confetes.forEach(c => {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.38; // Gravidade suave
      c.rotacao += c.vRotacao;
      c.opacidade -= 0.009;

      if (c.opacidade > 0) {
        vivos++;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotacao * Math.PI) / 180);
        ctx.fillStyle = c.cor;
        ctx.globalAlpha = Math.max(0, c.opacidade);

        if (c.isStar) {
          ctx.beginPath();
          ctx.arc(0, 0, c.tamanho / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-c.tamanho / 2, -c.tamanho / 2, c.tamanho, c.tamanho * 0.7);
        }
        ctx.restore();
      }
    });

    if (vivos > 0) {
      animId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  loop();
}

// ===================================================
// INICIALIZAÇÃO DO SISTEMA
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  // Preenche data mínima como hoje
  const hoje = new Date().toISOString().split('T')[0];
  const inputData = document.getElementById('cliData');
  if (inputData) {
    inputData.min = hoje;
    inputData.value = hoje;
  }

  renderizarCatalogo();
  atualizarInterfaceCarrinho();

  // Fecha splash screen com animação suave
  setTimeout(() => {
    goTo('catalogo');
  }, 1200);
});

window.addEventListener("storage", (evento) => {
  if (evento.key === "doce_encomenda_catalogo") {
    PRODUTOS = carregarCatalogo();
    renderizarCatalogo();
  }
});