# CONTEXT.md — Netinha Gourmet | Doce Encomenda
## Documento de contexto para implementação do MVP com Google Antigravity

**Objetivo deste arquivo:** orientar uma IA de desenvolvimento a transformar o protótipo visual do Figma em uma aplicação MVP funcional, mantendo a identidade visual, os fluxos de usuário e as regras operacionais descritas neste documento.

**Referência visual:** protótipo Figma “Refinar protótipo Doce Encomenda” e capturas de tela fornecidas pelo responsável pelo projeto.  
**Regra principal:** o protótipo é a referência de UI/UX; o repositório atual e seu código são a referência da arquitetura e das funcionalidades já existentes.

---

# 1. Missão do projeto

Implementar a experiência **Netinha Gourmet — Doce Encomenda**, uma aplicação para venda e gestão de encomendas de confeitaria.

A aplicação possui duas áreas principais:

1. **Área do cliente:** apresenta o catálogo, permite selecionar produtos, informar dados de retirada, revisar o pedido, visualizar as instruções de pagamento e receber a confirmação/ticket do pedido.
2. **Painel administrativo da confeiteira:** permite acompanhar pedidos, visualizar indicadores, consultar a fila de produção, gerenciar o cardápio e acompanhar compras/insumos.

A entrega deve ser um MVP utilizável, não apenas uma reprodução estática das telas. Botões, formulários, estados, cálculos, navegação e feedbacks precisam funcionar.

## Resultado esperado

- Interface visual próxima ao protótipo.
- Experiência consistente em celular, tablet e desktop.
- Fluxo completo de encomenda, do catálogo à confirmação.
- Painel administrativo conectado aos mesmos dados de pedidos.
- Regras de preço, sinal, saldo e status centralizadas e consistentes.
- Código organizado, reutilizável e fácil de evoluir.
- Nenhuma funcionalidade existente deve ser removida sem justificativa e autorização.

---

# 2. Como a IA deve trabalhar no repositório

Antes de editar qualquer arquivo:

1. Inspecione a estrutura completa do projeto.
2. Identifique framework, linguagem, gerenciador de pacotes, comandos de execução e build.
3. Identifique banco de dados, camada de persistência, autenticação, rotas e integrações já existentes.
4. Localize as telas e componentes atuais relacionados a catálogo, carrinho, checkout, pagamento e administração.
5. Execute o projeto e registre o estado inicial, se possível.
6. Identifique funcionalidades já implementadas e diferencie-as das que são apenas visuais.
7. Apresente um plano curto de implementação, com arquivos que serão criados ou alterados.

**Não presuma a stack.** Preserve a tecnologia já utilizada no repositório. Não migre framework, banco de dados ou arquitetura apenas por preferência da IA.

## Regras de alteração

- Não recriar o projeto do zero se já existir uma base funcional.
- Não substituir dados reais por mocks sem necessidade.
- Não apagar componentes, rotas ou regras existentes sem explicar o motivo.
- Reutilizar componentes e padrões já adotados no projeto.
- Evitar duplicação de regras de negócio entre telas.
- Não colocar credenciais, tokens, chaves PIX privadas ou segredos no frontend.
- Não inventar integrações. Se uma integração não estiver configurada, criar uma abstração e documentar o que falta.
- Fazer alterações em etapas pequenas e verificáveis.
- Ao concluir cada etapa, executar testes, lint e build disponíveis no projeto.
- Não declarar uma funcionalidade concluída se ela apenas tiver aparência funcional.

Se faltar uma informação indispensável, faça uma pergunta objetiva. Para detalhes não críticos, escolha uma solução simples, segura e coerente, registre a decisão e prossiga.

---

# 3. Leitura do protótipo: arquitetura de experiência

As capturas mostram os seguintes fluxos.

## 3.1 Entrada / página inicial do cliente

Elementos observados:
- Marca centralizada: **Netinha Gourmet**.
- Assinatura: “Feito com muito carinho”.
- Mensagem de posicionamento: “Bolos, doces e balas de coco”.
- Botão principal: “Fazer uma Encomenda”.
- Acesso secundário: “Painel da Confeiteira”.

Comportamento:
- “Fazer uma Encomenda” inicia o fluxo do catálogo.
- “Painel da Confeiteira” direciona para a área administrativa, protegida por autenticação/autorização.
- A marca e a hierarquia visual devem permanecer claras em telas pequenas.

## 3.2 Catálogo / seleção de produtos

Elementos observados:
- Cabeçalho com ação “Sair”, logotipo, botão de alternância de tema e ícone de sacola com contador.
- Indicador de etapas:
  1. Cardápio
  2. Retirada
  3. Pagamento
- Filtros por categoria, por exemplo: Todos, Bolos e Brigadeiros.
- Cards de produtos com foto, nome, preço, descrição e quantidade.
- Área inferior fixa com quantidade de itens, total e botão “Avançar”.

Comportamento:
- Filtro de categoria atualiza os produtos exibidos.
- O card permite adicionar e remover unidades.
- Quantidade nunca pode ficar negativa.
- O contador da sacola reflete a quantidade total de unidades.
- O total é calculado a partir do preço vigente e das quantidades.
- “Avançar” só fica habilitado quando existir pelo menos um item no carrinho.
- O carrinho deve ser preservado ao avançar e voltar entre etapas.
- A área inferior fixa não pode cobrir o conteúdo nem os controles dos cards.
- Imagens devem manter proporção e receber tratamento adequado quando não houver imagem.

## 3.3 Dados de retirada / checkout

Elementos observados:
- Resumo do pedido com itens e total.
- Campo Nome completo.
- Campo WhatsApp com DDD.
- Campo Data de retirada.
- Seleção da janela/turno de retirada.
- Campo de observações ou preferências, quando previsto no formulário.
- Botão fixo “Revisar Pedido”.

Comportamento:
- Validar campos obrigatórios antes de avançar.
- Normalizar e validar o telefone com DDD.
- Impedir datas anteriores ao dia atual.
- Respeitar antecedência mínima de preparo configurada pela confeiteira. O protótipo exibe 24 horas como exemplo; tratar como regra configurável, não como constante espalhada pelo código.
- Exibir apenas datas/janelas disponíveis conforme configuração e capacidade operacional.
- A seleção de data e janela deve ser mantida ao voltar para o formulário.
- O resumo deve refletir os produtos e valores atuais do carrinho.
- Não aceitar pedido com carrinho vazio.

## 3.4 Modal de revisão

Antes de confirmar, apresentar uma revisão com:
- Itens, quantidades e preços.
- Data de retirada.
- Nome do cliente.
- Valor total.
- Ações “Cancelar” e “Garantir Encomenda”.

Comportamento:
- “Cancelar” fecha o modal sem perder os dados preenchidos.
- “Garantir Encomenda” valida novamente os dados e cria o pedido.
- Evitar pedidos duplicados em cliques repetidos.
- Exibir estado de carregamento e feedback de erro/sucesso.
- O pedido deve receber um identificador único e legível, por exemplo `DOCE-045`; a geração deve ser segura e não depender apenas do estado local do navegador.

## 3.5 Pagamento / sinal

O protótipo apresenta:
- Sinal de 50% do valor total.
- Saldo restante para a retirada.
- Cartão com QR Code PIX.
- Chave PIX com botão “Copiar Chave PIX”.
- Botão “Já Realizei o Pagamento”.

Regra de negócio demonstrada:
- Sinal = 50% do total.
- Saldo = total − sinal.
- Exemplo visual: pedido de R$ 120,00 → sinal de R$ 60,00 → saldo de R$ 60,00.

Requisitos:
- Centralizar o percentual de sinal em configuração, permitindo alteração futura.
- Usar cálculo monetário seguro (centavos inteiros ou biblioteca decimal); evitar erros de ponto flutuante.
- O botão de copiar deve copiar a chave PIX configurada e apresentar confirmação.
- O QR Code deve corresponder à cobrança/chave configurada. Não gerar um QR Code decorativo ou inválido.
- Não usar a chave PIX de demonstração do protótipo em produção.
- Chave, nome do recebedor, cidade e parâmetros de cobrança devem vir de configuração segura.
- “Já Realizei o Pagamento” deve registrar a solicitação/declaração do cliente, mas **não deve marcar automaticamente o pagamento como confirmado**, a menos que exista integração confiável de confirmação.
- O estado inicial após essa ação deve ser algo como “Aguardando confirmação do pagamento”.
- O administrador deve conseguir confirmar ou rejeitar o pagamento, registrando data e responsável.
- Informar claramente ao cliente o que acontece depois do envio do comprovante/declaração.

## 3.6 Confirmação e ticket de retirada

Elementos observados:
- Mensagem “Pedido Recebido!”.
- Orientação para aguardar confirmação via WhatsApp.
- Ticket com número do pedido.
- Dados do cliente.
- Data e janela de retirada.
- Produtos e quantidades.
- Total, sinal e saldo.
- Botão para enviar pedido pelo WhatsApp da confeiteira.
- Botão “Fazer Nova Encomenda”.

Comportamento:
- Mostrar os dados reais do pedido recém-criado.
- Gerar mensagem de WhatsApp com texto codificado corretamente.
- Usar número comercial configurado, com DDI e DDD; não fixar número de teste no código.
- O link deve abrir o WhatsApp ou WhatsApp Web com mensagem pré-preenchida. O cliente deve confirmar o envio.
- “Fazer Nova Encomenda” inicia um novo carrinho sem alterar o pedido anterior.
- Disponibilizar consulta posterior do pedido por identificador e mecanismo seguro de validação, se essa função fizer parte do MVP.

---

# 4. Painel administrativo

O protótipo mostra uma área administrativa com navegação inferior:
- Início
- Esteira
- Cardápio
- Compras

O cabeçalho apresenta marca, ação de saída e identificação de Admin.

## 4.1 Início / dashboard

Elementos observados:
- Data atual e saudação “Hoje”.
- Botão “+ Novo Pedido”.
- Indicador “Retiradas hoje”.
- Indicador “Caixa previsto”.
- Indicador “Em produção”.
- Indicador “Próxima retirada”.
- Destaque para pedido que exige atenção.
- Lista “Pedidos Recentes”.

Comportamento:
- Indicadores devem ser calculados a partir dos pedidos persistidos.
- “Retiradas hoje” conta pedidos com retirada na data atual e status válido.
- “Caixa previsto” deve considerar saldos pendentes de recebimento, sem somar valores já pagos.
- “Em produção” conta pedidos efetivamente nesse status.
- “Próxima retirada” deve apontar o pedido futuro mais próximo que ainda esteja ativo.
- Cards e pedidos recentes devem abrir detalhes do pedido.
- “Novo Pedido” deve permitir que a administração registre uma encomenda recebida por outro canal, reutilizando as mesmas validações e regras.

## 4.2 Esteira de pedidos

Criar uma visualização operacional para acompanhar pedidos por status. O protótipo apresenta pelo menos estes estados:
- Aguardando Sinal
- Em Produção
- Pronto

Estados adicionais recomendados para consistência:
- Aguardando Confirmação do Pagamento
- Confirmado
- Cancelado
- Entregue
- Pagamento Rejeitado (se aplicável)

A IA deve mapear os estados ao que já existir no projeto e evitar criar estados redundantes.

Comportamento:
- Permitir filtrar por status, data de retirada e busca por número/nome.
- Abrir detalhes completos do pedido.
- Permitir transições de status apenas quando válidas.
- Registrar histórico de alterações (status anterior, novo status, data/hora e usuário responsável).
- Não permitir que um pedido cancelado seja movido para produção sem uma ação explícita de reabertura.
- Destacar pedidos atrasados ou próximos da retirada.

## 4.3 Cardápio

A área deve permitir:
- Listar produtos.
- Criar e editar produtos.
- Ativar/desativar disponibilidade.
- Definir nome, descrição, categoria, preço e imagem.
- Definir informações de apresentação (ex.: peso, rendimento ou quantidade de fatias).
- Controlar disponibilidade sem apagar produtos associados a pedidos antigos.

O preço registrado no pedido deve ser uma fotografia do preço no momento da compra. Alterar o preço do catálogo não pode modificar pedidos já realizados.

## 4.4 Compras / insumos

O protótipo indica uma área “Compras”. A captura não detalha suas telas internas. Implementar somente o escopo já existente no repositório ou o mínimo definido pelo produto.

Diretriz inicial:
- Não inventar um módulo complexo de estoque sem requisitos.
- Se já houver controle de insumos, preservar e conectar a navegação.
- Se ainda não houver, criar uma tela de estado vazio bem projetada e documentar os próximos passos, sem simular funcionalidades inexistentes.

---

# 5. Regras de negócio essenciais

Estas regras devem ficar na camada de domínio/serviço, e não espalhadas pelos componentes visuais.

## 5.1 Pedido e valores

- `subtotal = soma(preço_unitário_no_pedido × quantidade)`
- `total = subtotal - descontos + taxas`, se essas funcionalidades existirem.
- `sinal = arredondamento(total × percentual_sinal)`
- `saldo = total - sinal`
- Percentual demonstrado pelo protótipo: 50%.
- Valores devem ser armazenados/calculados em centavos inteiros ou tipo decimal apropriado.
- Guardar no item do pedido o nome e preço unitário praticados no momento da compra.

## 5.2 Datas e retirada

- Usar fuso horário `America/Sao_Paulo` para regras de calendário e horários exibidos ao usuário.
- Bloquear datas passadas.
- Respeitar antecedência mínima configurável.
- Validar a janela de retirada selecionada contra as janelas disponíveis.
- Evitar conflitos de capacidade quando houver limite de pedidos por período.
- Manter data e janela consistentes em formulário, modal, ticket, WhatsApp e painel.

**Atenção:** as capturas contêm exemplos com datas e janelas que não são necessariamente consistentes entre todas as telas. Tratar os valores das imagens como dados ilustrativos. A fonte da verdade é a seleção atual do usuário e os dados persistidos do pedido. Nunca exibir datas ou janelas divergentes entre etapas.

## 5.3 Status e pagamento

- Separar status do pedido e status do pagamento.
- Exemplo de status do pedido: `RECEIVED`, `IN_PRODUCTION`, `READY`, `DELIVERED`, `CANCELLED`.
- Exemplo de status do pagamento: `PENDING`, `CUSTOMER_REPORTED`, `CONFIRMED`, `REJECTED`, `PARTIALLY_PAID`, `PAID`.
- Os nomes técnicos podem seguir a convenção já existente no repositório.
- A confirmação manual do pagamento deve registrar responsável e horário.
- Não confundir “cliente informou que pagou” com “pagamento confirmado”.
- A esteira administrativa deve refletir as regras de transição.

## 5.4 Integridade

- Criar pedido e itens de pedido de forma atômica quando o banco suportar transações.
- Evitar duplicidade por clique repetido ou reenvio.
- Validar preço e disponibilidade no servidor antes de concluir.
- Não confiar no total enviado pelo navegador: recalcular no backend.
- Não permitir alteração retroativa de valores de pedidos concluídos.

---

# 6. Direção visual e design system

A interface deve manter o estilo artesanal, acolhedor e elegante da marca, com aparência de confeitaria premium e leitura simples.

## 6.1 Paleta aproximada observada

Usar os valores abaixo como ponto de partida e ajustar após comparação visual com as referências:

| Token | Cor aproximada | Uso |
|---|---|---|
| `--color-background` | `#FFF7F1` | Fundo principal creme |
| `--color-surface` | `#FFFFFF` | Cards e formulários |
| `--color-primary` | `#C84328` | Botões e ações principais |
| `--color-primary-hover` | `#AE351F` | Hover/pressed |
| `--color-text` | `#452416` | Texto principal marrom |
| `--color-muted` | `#9A6E5D` | Texto secundário |
| `--color-border` | `#EBD5C4` | Bordas e divisórias |
| `--color-highlight` | `#FFF2C5` | Alertas suaves |
| `--color-success` | `#16A34A` | Confirmações |
| `--color-info-bg` | `#DBEAFE` | Estado informativo |
| `--color-info-text` | `#1D4ED8` | Texto informativo |

Não espalhar hexadecimais pelos componentes. Criar tokens CSS/tema centralizados.

## 6.2 Tipografia

O protótipo combina:
- Serifada elegante em títulos e valores de destaque.
- Sans-serif legível em formulários, botões, descrições e dados.
- Títulos com personalidade, sem comprometer legibilidade.
- Valores monetários com destaque visual.

Definir uma escala tipográfica consistente. Utilizar fontes web apenas se já houver estratégia de carregamento adequada; prever fontes de fallback.

## 6.3 Componentes visuais

Criar ou padronizar:
- Botão primário, secundário e de contorno.
- Campo de texto, telefone, data e área de observação.
- Card de produto.
- Card de pedido.
- Badge de status.
- Stepper de etapas.
- Filtro de categorias.
- Resumo de carrinho.
- Barra de ação fixa inferior.
- Modal de revisão.
- Ticket de retirada.
- Cards de indicadores administrativos.
- Estados vazios, carregamento, erro e sucesso.
- Cabeçalho e navegação inferior.

## 6.4 Formas e espaçamento

- Cards com cantos arredondados generosos.
- Bordas finas em tom bege.
- Sombras discretas, principalmente em elementos elevados.
- Botões grandes, com área de toque confortável.
- Espaçamento consistente entre seções.
- Use ícones vetoriais consistentes, sem emojis, e não substitua rótulos importantes.
- Imagens de produtos devem ter recorte consistente, boa qualidade e dimensões reservadas para evitar saltos de layout.

## 6.5 Responsividade: requisito obrigatório

**Não transformar o desktop em uma versão ampliada do celular, nem reduzir o desktop para caber no celular.** Criar layouts adaptáveis com hierarquia própria para cada faixa de tela.

- Mobile: prioridade para uma coluna, controles de largura total, navegação inferior quando adequada e barras fixas que respeitem a área segura do aparelho.
- Tablet: aproveitar largura adicional sem esticar excessivamente textos e cards.
- Desktop: utilizar largura máxima de conteúdo, grids e navegação apropriada; evitar cards gigantes e linhas excessivamente longas.
- Usar CSS Grid/Flexbox e breakpoints baseados no conteúdo.
- Evitar larguras fixas que provoquem rolagem horizontal.
- Respeitar `safe-area-inset` em dispositivos móveis.
- Não depender de dimensões específicas do screenshot.
- Testar ao menos em larguras aproximadas de 360 px, 390 px, 768 px, 1024 px e 1440 px.

## 6.6 Tema escuro

O protótipo apresenta alternância de tema, mas uma captura do tema escuro mostra contraste insuficiente em textos dentro de cards claros.

Requisitos:
- Implementar tema claro e escuro com tokens semânticos.
- No tema escuro, definir fundo, superfícies, bordas, textos, campos e estados de forma coerente.
- Nunca usar texto quase branco sobre superfície branca ou texto claro sobre fundo claro.
- Validar contraste de textos e controles.
- Persistir a preferência do usuário, se a arquitetura atual permitir.
- O tema deve afetar toda a aplicação, não apenas o fundo.

---

# 7. Acessibilidade e qualidade de UX

- Contraste adequado para textos, botões e badges.
- Campos com rótulos persistentes; placeholder não substitui label.
- Estados de foco visíveis para navegação por teclado.
- Botões com nomes acessíveis.
- Não comunicar status apenas por cor: incluir texto.
- Áreas de toque confortáveis em dispositivos móveis.
- Mensagens de validação próximas ao campo correspondente.
- Erros devem explicar como corrigir.
- Modais devem permitir fechamento acessível e não perder dados por acidente.
- Evitar animações excessivas; respeitar preferência por redução de movimento.
- Preservar dados preenchidos quando houver erro de rede.

---

# 8. Dados e entidades sugeridas

Adaptar aos modelos já existentes. Não duplicar tabelas/entidades se houver equivalentes.

## Product
- id
- name
- description
- categoryId
- priceInCents
- imageUrl
- presentationDetails (ex.: peso, fatias)
- isAvailable
- createdAt
- updatedAt

## Category
- id
- name
- sortOrder
- isActive

## Order
- id
- publicCode
- customerName
- customerPhone
- pickupDate
- pickupWindowId ou pickupWindow
- notes
- subtotalInCents
- discountInCents
- totalInCents
- depositInCents
- remainingInCents
- orderStatus
- paymentStatus
- customerPaymentReportedAt
- paymentConfirmedAt
- createdAt
- updatedAt

## OrderItem
- id
- orderId
- productId
- productNameSnapshot
- unitPriceInCents
- quantity
- lineTotalInCents

## PickupWindow
- id
- label (ex.: Manhã, Tarde, Fim de Tarde)
- startTime
- endTime
- isActive
- capacity, se houver controle de capacidade

## OrderStatusHistory
- id
- orderId
- previousStatus
- newStatus
- changedBy
- changedAt
- note

## Configurações operacionais
- percentual de sinal
- antecedência mínima
- janelas de retirada
- dias disponíveis
- limite por janela, se aplicável
- chave PIX e dados do recebedor
- WhatsApp comercial
- nome/identidade da confeitaria

Esses campos são uma referência conceitual. Respeitar a modelagem existente e as convenções do projeto.

---

# 9. Segurança e privacidade

- Área administrativa protegida por autenticação e autorização no servidor.
- Não considerar um botão ou rota escondida como proteção.
- Validar permissões em todas as operações administrativas.
- Não expor dados de outros clientes por identificadores previsíveis.
- Não armazenar segredos no código frontend ou no repositório.
- Validar e sanitizar entradas.
- Proteger operações de criação/edição contra requisições inválidas.
- Limitar dados pessoais exibidos no painel ao necessário para a operação.
- Evitar logs com telefone completo, credenciais ou informações sensíveis.
- Definir política de retenção e acesso aos dados conforme a necessidade do negócio.
- Se houver envio de WhatsApp, abrir o canal com mensagem pré-preenchida; não afirmar que a mensagem foi enviada sem confirmação.

---

# 10. Estratégia de implementação por fases

A IA deve executar uma fase por vez, validar e só então avançar.

## Fase 0 — Diagnóstico
- Inspecionar repositório e stack.
- Executar a aplicação.
- Mapear funcionalidades existentes.
- Identificar lacunas em relação a este documento.
- Apresentar plano e riscos.

**Critério de saída:** diagnóstico objetivo e plano compatível com o código atual.

## Fase 1 — Fundação visual
- Criar tokens de cor, tipografia, espaçamento, bordas e sombras.
- Padronizar componentes básicos.
- Implementar layout responsivo.
- Implementar tema claro/escuro com contraste correto.

**Critério de saída:** estrutura visual consistente sem regressão de navegação.

## Fase 2 — Catálogo e carrinho
- Categorias e filtros.
- Cards de produtos.
- Adicionar/remover quantidades.
- Contador e total.
- Persistência temporária do carrinho conforme arquitetura.

**Critério de saída:** carrinho calcula corretamente e sobrevive à navegação entre etapas.

## Fase 3 — Checkout e revisão
- Dados do cliente.
- Data e janela de retirada.
- Validações.
- Resumo e modal de revisão.
- Criação persistente do pedido.

**Critério de saída:** pedido criado uma única vez com dados e valores corretos.

## Fase 4 — Pagamento e confirmação
- Cálculo do sinal e saldo.
- Chave e QR Code PIX reais/configuráveis.
- Registro de declaração de pagamento.
- Ticket e link de WhatsApp.

**Critério de saída:** valores consistentes em todas as telas e status de pagamento sem falsa confirmação.

## Fase 5 — Painel administrativo
- Dashboard com indicadores reais.
- Lista/esteira de pedidos.
- Detalhes e atualização de status.
- Gestão de produtos/cardápio.
- Área de compras conforme escopo confirmado.

**Critério de saída:** ações administrativas atualizam os mesmos dados usados pela área do cliente.

## Fase 6 — Testes e estabilização
- Testes funcionais e de regras de negócio.
- Testes responsivos.
- Testes de acessibilidade e contraste.
- Testes de permissões.
- Testes de build e execução.
- Correção de bugs e documentação.

**Critério de saída:** checklist final aprovado e limitações conhecidas documentadas.

---

# 11. Cenários mínimos de teste

1. Cliente abre catálogo e filtra por Bolos.
2. Cliente adiciona dois produtos diferentes.
3. Cliente aumenta e diminui quantidades; o total acompanha a alteração.
4. Cliente tenta avançar com carrinho vazio; sistema impede.
5. Cliente tenta enviar formulário sem nome; sistema informa o erro.
6. Cliente informa telefone inválido; sistema impede a conclusão.
7. Cliente escolhe data passada; sistema impede.
8. Cliente escolhe data sem antecedência mínima; sistema impede ou oferece datas válidas.
9. Cliente seleciona uma janela e confirma; a mesma janela aparece no ticket e no painel.
10. Pedido de R$ 120,00 calcula sinal de R$ 60,00 e saldo de R$ 60,00, considerando sinal de 50%.
11. Alterar preço do produto não altera o valor de um pedido antigo.
12. Clique repetido em “Garantir Encomenda” não cria pedidos duplicados.
13. Cliente declara pagamento; o pedido não é marcado automaticamente como pago.
14. Administrador confirma pagamento; histórico registra responsável e horário.
15. Administrador altera pedido para “Em Produção”; dashboard e esteira refletem a mudança.
16. Pedido pronto aparece corretamente na operação de retirada.
17. Usuário não autenticado não acessa operações administrativas.
18. Interface não apresenta rolagem horizontal em 360 px.
19. Tema escuro mantém legibilidade de textos, botões e cards.
20. WhatsApp abre com número e mensagem configurados, sem afirmar envio automático.

---

# 12. Critérios de aceite visual

Comparar a implementação com as capturas do Figma considerando:
- Hierarquia e posicionamento dos elementos.
- Paleta e contraste.
- Tipografia e pesos.
- Raio de borda, espaçamentos e sombras.
- Tamanho e proporção dos cards.
- Comportamento das barras fixas.
- Aparência dos estados e badges.
- Consistência entre telas do mesmo fluxo.

Não buscar cópia pixel a pixel às custas de usabilidade. Se algum detalhe do protótipo prejudicar acessibilidade, responsividade ou clareza, preservar a identidade visual e corrigir a experiência.

---

# 13. Instrução de execução para o Antigravity

Use este documento como contexto permanente do projeto.

**Primeira tarefa:** realizar somente o diagnóstico da Fase 0. Não reescrever a aplicação ainda.

Ao apresentar o diagnóstico, informar:
1. Stack detectada.
2. Estrutura de pastas relevante.
3. Fluxos já implementados.
4. Funcionalidades que são apenas visuais.
5. Integrações e persistência existentes.
6. Lacunas em relação ao `CONTEXT.md`.
7. Plano de execução dividido em fases.
8. Arquivos que pretende alterar em cada fase.

Após a aprovação do plano, implementar uma fase por vez. Ao final de cada fase, informar:
- O que foi implementado.
- Arquivos criados/alterados.
- Como testar.
- Testes executados e resultados.
- Pendências e riscos.

**Prioridade absoluta:** preservar o funcionamento do MVP, implementar regras reais e aproximar a experiência do protótipo sem comprometer segurança, acessibilidade ou responsividade.
