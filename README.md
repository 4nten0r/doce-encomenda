# Doce Encomenda

Portal de encomendas para uma confeitaria artesanal, com duas interfaces:

- **Portal do cliente:** catálogo, carrinho, dados de retirada, reserva de 50% e comprovante.
- **Painel da confeiteira:** acompanhamento da produção, caixa previsto, pedidos manuais e lista de compras.

O projeto foi pensado para uso em celular, com uma identidade visual ameixa, coral, dourado e mint, combinando a delicadeza da confeitaria com uma interface moderna.

## Links publicados

- Portal do cliente: https://4nten0r.github.io/doce-encomenda/
- Painel da confeiteira: https://4nten0r.github.io/doce-encomenda/admin.html
- Repositório: https://github.com/4nten0r/doce-encomenda

> O GitHub Pages pode levar alguns minutos para publicar alterações novas depois de um push.

## Como o cliente usa

1. Acessa o portal e navega pelas categorias **Todos**, **Bolos**, **Brigadeiros** e **Combos**.
2. Adiciona os produtos ao carrinho usando os botões `+` e `-`.
3. Avança para **Retirada**.
4. Preenche nome, WhatsApp, data, horário e observação opcional.
5. Confere o valor do pedido e o sinal de 50%.
6. Copia o código PIX ou consulta o QR Code.
7. Clica em **Já Realizei o Pagamento** para gerar o ticket da encomenda.
8. Envia o resumo para o WhatsApp da confeiteira.

O ticket apresenta o código do pedido, os itens, a data de retirada, o sinal pago e o saldo restante.

## Como a confeiteira usa

Abra o painel em `/admin.html`.

### Acompanhamento diário

1. Selecione a data de retirada.
2. Use **Hoje** para voltar rapidamente à data atual.
3. Consulte as métricas do dia:
   - Retiradas previstas.
   - Caixa previsto dos saldos.
   - Pedidos em produção.
   - Próxima retirada.
4. Acompanhe cada pedido na esteira de produção.
5. Avance ou retorne o status de cada pedido.

### Status da esteira

Os pedidos seguem este fluxo:

1. **Aguardando Sinal**
2. **Em Produção**
3. **Pronto p/ Retirar**
4. **Concluído**

No celular, a esteira pode ser percorrida horizontalmente para facilitar a consulta das colunas.

### Pedido de balcão ou WhatsApp

Use **Novo Pedido Balcão** para registrar pedidos recebidos fora do portal. Informe:

- Nome do cliente.
- WhatsApp.
- Produto.
- Data de retirada.
- Janela de horário.

O pedido entra automaticamente em **Aguardando Sinal**.

### Lista de compras

A opção **Lista de Compras (JIT)** consolida os ingredientes necessários para os próximos sete dias, considerando pedidos em:

- Aguardando Sinal.
- Em Produção.
- Pronto.

As quantidades são calculadas a partir do mapeamento de ingredientes em `admin.js`.

### Atualizar produtos e receitas

No cabeçalho do painel, abra **Cardápio & Receitas**.

1. Clique em **+ Novo** para cadastrar um produto ou selecione um produto existente para editar.
2. Preencha nome, emoji, categoria, preço, selo, rendimento e descrição.
3. Cadastre a receita com uma linha por ingrediente no formato:

   ```text
   Ingrediente | quantidade | unidade
   ```

   Exemplo:

   ```text
   Leite Condensado | 3 | latas
   Ovos | 4 | unidades
   Manteiga | 200 | g
   ```

4. Clique em **Salvar no cardápio**.

O produto passa a aparecer no portal do cliente e no formulário de pedido de balcão. A receita passa a ser considerada pela **Lista de Compras (JIT)**. Produtos também podem ser excluídos pelo mesmo editor.

## Estrutura do projeto

```text
index.html   Portal do cliente
admin.html   Painel da confeiteira
app.js       Catálogo, carrinho, checkout e integração com WhatsApp
admin.js     Pedidos, métricas, Kanban e lista de compras
README.md    Documentação do projeto
```

## Executar localmente

Como o projeto é estático, basta abrir `index.html` no navegador. Para uma experiência mais próxima da publicação, use um servidor local no VS Code ou outro servidor HTTP simples.

O projeto não exige Node.js, banco de dados ou processo de build.

## Publicar alterações

O repositório usa a branch `main` e o GitHub Pages publica a raiz do projeto.

```powershell
git add .
git commit -m "Descreva a alteração"
git push origin main
```

Depois do push, o GitHub Pages atualiza o site automaticamente.

## Armazenamento dos pedidos

Os pedidos são salvos em:

```text
localStorage['doce_encomenda_pedidos']
```

O catálogo e as receitas usam estas chaves adicionais:

```text
localStorage['doce_encomenda_catalogo']
localStorage['doce_encomenda_receitas']
```

Isso significa:

- O cliente e o admin compartilham pedidos quando acessados no mesmo navegador e domínio.
- Cada navegador ou dispositivo possui seu próprio armazenamento.
- Os pedidos não são sincronizados entre celulares, computadores ou usuários diferentes.
- Limpar os dados do navegador pode apagar os pedidos daquele dispositivo.
- O projeto ainda não possui autenticação, banco de dados ou controle de acesso.

Para uma operação real com vários dispositivos, será necessário substituir o `localStorage` por uma API e um banco de dados, além de proteger o painel administrativo com login.

## Configurações antes do uso comercial

Os seguintes dados ainda são demonstrativos e devem ser alterados no código:

- Chave PIX em `app.js`.
- Telefone usado no envio para WhatsApp em `app.js`.
- Produtos e preços do catálogo em `app.js`.
- Produtos, preços e receitas do pedido de balcão em `admin.js`.
- Ingredientes e quantidades das receitas em `admin.js`.

O botão de confirmação do PIX atualmente simula a validação do pagamento após alguns instantes. Ele não consulta um banco nem confirma uma transação real.

## Tecnologias

- HTML5.
- CSS3.
- JavaScript puro.
- Tailwind CSS via CDN.
- Google Fonts.
- LocalStorage do navegador.
- GitHub Pages.

## Próximos passos recomendados

1. Criar backend e banco de dados compartilhado.
2. Adicionar login para o painel da confeiteira.
3. Integrar confirmação real de PIX via provedor de pagamentos.
4. Substituir dados demonstrativos por configurações administrativas.
5. Adicionar backup e exportação dos pedidos.
6. Instalar Tailwind pelo processo de build em produção, removendo a dependência do CDN.
