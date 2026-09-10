const CATALOGO_PADRAO = [
  {
    id: "p1",
    nome: "Bolo Clássico Ninho c/ Morangos (1.5kg)",
    categoria: "bolos",
    preco: 120.00,
    descricao: "Massa amanteigada artesanal, recheio generoso de leite ninho e morangos frescos selecionados.",
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85",
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
    imagem: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=85",
    emoji: "🥂",
    badge: "Intimista",
    rendimento: "Ideal p/ 8 a 10 convidados"
  }
];

const RECEITAS_PADRAO = {
  "p1": [
    { name: "Leite Condensado", quantity: 3, unit: "latas" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Ovos", quantity: 4, unit: "unidades" },
    { name: "Manteiga", quantity: 200, unit: "g" }
  ],
  "p2": [
    { name: "Cream Cheese", quantity: 2, unit: "potes" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Cacau em Pó", quantity: 100, unit: "g" },
    { name: "Açúcar Refinado", quantity: 300, unit: "g" }
  ],
  "p5": [
    { name: "Leite Condensado", quantity: 8, unit: "latas" },
    { name: "Cacau em Pó", quantity: 200, unit: "g" },
    { name: "Manteiga", quantity: 100, unit: "g" },
    { name: "Granulado Belga", quantity: 300, unit: "g" }
  ],
  "p7": [
    { name: "Leite Condensado", quantity: 11, unit: "latas" },
    { name: "Farinha de Trigo", quantity: 0.5, unit: "kg" },
    { name: "Ovos", quantity: 4, unit: "unidades" },
    { name: "Manteiga", quantity: 300, unit: "g" }
  ]
};

function clonarDados(dados) {
  return JSON.parse(JSON.stringify(dados));
}

function carregarCatalogo() {
  const salvo = localStorage.getItem("doce_encomenda_catalogo");
  if (salvo) {
    try { return JSON.parse(salvo); } catch (erro) {}
  }
  localStorage.setItem("doce_encomenda_catalogo", JSON.stringify(CATALOGO_PADRAO));
  return clonarDados(CATALOGO_PADRAO);
}

function salvarCatalogo(catalogo) {
  localStorage.setItem("doce_encomenda_catalogo", JSON.stringify(catalogo));
}

function carregarReceitas() {
  const salvo = localStorage.getItem("doce_encomenda_receitas");
  if (salvo) {
    try { return JSON.parse(salvo); } catch (erro) {}
  }
  localStorage.setItem("doce_encomenda_receitas", JSON.stringify(RECEITAS_PADRAO));
  return clonarDados(RECEITAS_PADRAO);
}

function salvarReceitas(receitas) {
  localStorage.setItem("doce_encomenda_receitas", JSON.stringify(receitas));
}
