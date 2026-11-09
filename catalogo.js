const CATALOGO_PADRAO = [
  {
    id: "p1",
    nome: "Bolo Clássico Ninho c/ Morangos (1.5kg)",
    categoria: "bolos",
    preco: 120.00,
    descricao: "Massa amanteigada artesanal, recheio generoso de leite ninho e morangos frescos selecionados.",
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    badge: "Mais Pedido",
    rendimento: "Serve até 15 pessoas"
  },
  {
    id: "p2",
    nome: "Bolo Red Velvet Nobre (1.5kg)",
    categoria: "bolos",
    preco: 140.00,
    descricao: "Veludo vermelho com autêntico recheio e cobertura de cream cheese frosting com toque de baunilha.",
    imagem: "https://images.unsplash.com/photo-1779885580435-949062b1abb3?auto=format&fit=crop&w=900&q=85",
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
    badge: "Gourmet",
    rendimento: "Serve até 15 pessoas"
  },
  {
    id: "p4",
    nome: "Caixa 50 Brigadeiros Belga Nobre",
    categoria: "doces",
    preco: 75.00,
    descricao: "Blend nobre de chocolate Callebaut 54% cacau enrolado em blossoms belgas.",
    imagem: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85",
    badge: "100% Callebaut",
    rendimento: "50 unidades artesanais"
  },
  {
    id: "p5",
    nome: "Cento de Brigadeiros Tradicionais",
    categoria: "doces",
    preco: 90.00,
    descricao: "Cento variado com brigadeiro tradicional, beijinho de coco queimado e dois amores.",
    imagem: "https://images.unsplash.com/photo-1787788629783-3505851503b3?auto=format&fit=crop&w=900&q=85",
    badge: "Favorito Festa",
    rendimento: "100 unidades"
  },
  {
    id: "p6",
    nome: "Box Degustação 16 Doces Finos",
    categoria: "doces",
    preco: 68.00,
    descricao: "Seleção luxuosa: Trufas douradas, camafeu de nozes e mini torteletes.",
    imagem: "https://images.unsplash.com/photo-1757450317518-9d385619f5ee?auto=format&fit=crop&w=900&q=85",
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
    badge: "Intimista",
    rendimento: "Ideal p/ 8 a 10 convidados"
  },
  {
    id: "p9",
    nome: "Balas de Coco Recheadas Gourmet (500g)",
    categoria: "balas",
    preco: 55.00,
    descricao: "Artesanais, derretem na boca com recheio cremoso de ninho e doce de leite artesanal.",
    imagem: "https://images.unsplash.com/photo-1776722089433-3513d173f5ee?auto=format&fit=crop&w=900&q=85",
    badge: "Especialidade",
    rendimento: "Aprox. 40 unidades"
  },
  {
    id: "p10",
    nome: "Balas de Coco Tradicionais de Festa (500g)",
    categoria: "balas",
    preco: 42.00,
    descricao: "Puxadas à mão no ponto exato, leves, ultra macias, derretem delicadamente no paladar.",
    imagem: "https://images.unsplash.com/photo-1792488954314-2158de445b79?auto=format&fit=crop&w=900&q=85",
    badge: "Receita de Família",
    rendimento: "Aprox. 50 unidades"
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
  ],
  "p9": [
    { name: "Leite de Coco Artesanal", quantity: 2, unit: "vidros" },
    { name: "Açúcar Cristal", quantity: 1, unit: "kg" },
    { name: "Leite Condensado", quantity: 2, unit: "latas" }
  ],
  "p10": [
    { name: "Leite de Coco Artesanal", quantity: 2, unit: "vidros" },
    { name: "Açúcar Cristal", quantity: 1, unit: "kg" }
  ]
};

const IMAGENS_CATALOGO_ANTERIORES = {
  p2: "photo-1586788224331-947f68671cf1",
  p4: "photo-1606313564200-e75d5e30476c",
  p5: "photo-1551024506-0bccd828d307",
  p6: "photo-1558961363-fa8fdf82db35",
  p9: "photo-1582058091505-f87a2e55a40f",
  p10: "photo-1548848221-0c2e497ed557"
};

function clonarDados(dados) {
  return JSON.parse(JSON.stringify(dados));
}

function carregarCatalogo() {
  const salvo = localStorage.getItem("doce_encomenda_catalogo");
  if (salvo) {
    try { 
      const parsed = JSON.parse(salvo);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let modificado = false;
        parsed.forEach(item => {
          if (Object.prototype.hasOwnProperty.call(item, "emoji")) {
            delete item.emoji;
            modificado = true;
          }
        });
        CATALOGO_PADRAO.forEach(itemPadrao => {
          const itemSalvo = parsed.find(item => item.id === itemPadrao.id);
          if (!itemSalvo) {
            parsed.push(itemPadrao);
            modificado = true;
          } else {
            if (
              IMAGENS_CATALOGO_ANTERIORES[itemPadrao.id]
              && itemSalvo.imagem
              && itemSalvo.imagem.includes(IMAGENS_CATALOGO_ANTERIORES[itemPadrao.id])
            ) {
              itemSalvo.imagem = itemPadrao.imagem;
              modificado = true;
            }
          }
        });
        if (modificado) {
          localStorage.setItem("doce_encomenda_catalogo", JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (erro) {}
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
    try { 
      const parsed = JSON.parse(salvo);
      if (parsed && typeof parsed === 'object') {
        let modificado = false;
        Object.entries(RECEITAS_PADRAO).forEach(([prodId, receita]) => {
          if (!parsed[prodId]) {
            parsed[prodId] = receita;
            modificado = true;
          }
        });
        if (modificado) {
          localStorage.setItem("doce_encomenda_receitas", JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (erro) {}
  }
  localStorage.setItem("doce_encomenda_receitas", JSON.stringify(RECEITAS_PADRAO));
  return clonarDados(RECEITAS_PADRAO);
}

function salvarReceitas(receitas) {
  localStorage.setItem("doce_encomenda_receitas", JSON.stringify(receitas));
}
