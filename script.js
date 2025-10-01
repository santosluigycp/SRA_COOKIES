/*
 * Projeto: Sra. Cookies - Loja Virtual
 * Participante(s): [Luigy e Isabela]
 * Data: [01/10/2025]
 *
 * Script principal para controle de interatividade, incluindo:
 * - Menu hamburguer
 * - Lógica do carrinho de compras
 * - Persistência de dados com LocalStorage
 */

/* O evento 'DOMContentLoaded' garante que o script só será executado após o HTML da página ser completamente carregado e parseado. */
document.addEventListener("DOMContentLoaded", () => {
  /* --- SELETORES DE ELEMENTOS ---
   * Armazena em constantes as referências aos elementos do DOM que serão manipulados.
   * É uma boa prática fazer isso no início para otimizar a performance e organizar o código.
  */
  const abrirCarrinhoBtn = document.getElementById("abrirCarrinho");
  const painelCarrinho = document.querySelector(".painel-carrinho");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const contadorCarrinho = document.getElementById("contador-carrinho");
  const totalElemento = document.getElementById("total");
  const botoesComprar = document.querySelectorAll(".card button");
  const botaoFinalizar = document.getElementById("finalizar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  /* --- LÓGICA DO MENU HAMBURGUER ---
   * Adiciona um evento de clique ao botão hamburguer que alterna a classe 'nav-aberta'
   * no menu de navegação, controlando sua visibilidade em telas menores (via CSS).
   * A verificação 'if (hamburgerBtn && navMenu)' evita erros caso o script seja usado em
   * uma página que não possua esses elementos.
  */
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("nav-aberta");
    });
  }

  /* --- LÓGICA PARA ABRIR E FECHAR O PAINEL DO CARRINHO ---
   * Alterna a classe 'aberto' no painel do carrinho quando o ícone do carrinho é clicado.
  */
  if (abrirCarrinhoBtn && painelCarrinho) {
    abrirCarrinhoBtn.addEventListener("click", () => {
      painelCarrinho.classList.toggle("aberto");
    });
  }

  /* --- LÓGICA PARA FECHAR O CARRINHO AO CLICAR FORA ---
   * Adiciona um listener global ao documento para detectar cliques.
   * Verifica se o clique ocorreu fora do painel do carrinho E fora do botão que o abre.
   * Se ambas as condições forem verdadeiras e o painel estiver aberto, ele é fechado.
   * Isso melhora a experiência do usuário.
  */
  document.addEventListener("click", (event) => {
    const isClickInsideCart = painelCarrinho.contains(event.target);
    const isCartButton = abrirCarrinhoBtn.contains(event.target);

    if (
      painelCarrinho.classList.contains("aberto") &&
      !isClickInsideCart &&
      !isCartButton
    ) {
      painelCarrinho.classList.remove("aberto");
    }
  });

  /* --- LÓGICA PRINCIPAL DO CARRINHO DE COMPRAS --- */

  /* Inicializa o carrinho. Tenta carregar os dados do localStorage.
   * 'localStorage.getItem("carrinho")' recupera os dados como uma string.
   * 'JSON.parse()' converte a string de volta para um array de objetos.
   * Se não houver nada salvo, '|| []' garante que o carrinho comece como um array vazio.
  */
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  /* Função para salvar o estado atual do carrinho no localStorage.
   * 'JSON.stringify()' converte o array de objetos do carrinho em uma string para que possa ser armazenado.
  */
  function salvarCarrinhoStorage() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  /* Função central que atualiza toda a interface do carrinho. */
  function atualizarCarrinho() {
    /* 1. Atualiza o contador de itens visível em todas as páginas. */
    contadorCarrinho.textContent = carrinho.length;

    /* 2. Salva o estado atual no localStorage para persistir os dados. */
    salvarCarrinhoStorage();

    /* 3. Atualiza a lista detalhada e o total APENAS se os elementos existirem na página atual. */
    if (listaCarrinho && totalElemento) {
      listaCarrinho.innerHTML = ""; /* Limpa a lista antes de recriá-la. */
      let total = 0;

      carrinho.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco
          .toFixed(2)
          .replace(".", ",")}`; /* Formata o preço para o padrão brasileiro. */
        listaCarrinho.appendChild(li);
        total += item.preco;
      });

      totalElemento.textContent = `Total: R$ ${total
        .toFixed(2)
        .replace(".", ",")}`;
    }
  }

  /* Adiciona um evento de clique para cada botão "Comprar" encontrado na página. */
  botoesComprar.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      /* A partir do botão clicado, encontra o 'card' pai mais próximo. */
      const card = e.target.closest(".card");
      /* Extrai o nome e o preço do produto a partir do card. */
      const nome = card.querySelector("h3").textContent;
      const precoTexto = card
        .querySelector("span")
        .textContent.replace("R$", "")
        .replace(",", ".");
      const preco = parseFloat(precoTexto);

      /* Adiciona o novo item como um objeto ao array do carrinho. */
      carrinho.push({ nome, preco });
      /* Chama a função para atualizar a interface com os novos dados. */
      atualizarCarrinho();
    });
  });

  /* Adiciona o evento para o botão "Finalizar Pedido". */
  if (botaoFinalizar) {
    botaoFinalizar.addEventListener("click", () => {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return; /* Interrompe a função se o carrinho estiver vazio. */
      }

      alert(
        "🎉 Pedido finalizado com sucesso! Obrigado por comprar com a Sra. Cookies 🍪"
      );

      /* Limpa o array do carrinho e atualiza a interface. */
      carrinho = [];
      atualizarCarrinho();
    });
  }

  /* Chama a função uma vez no carregamento da página para inicializar a interface
   * com os dados que possam estar salvos no localStorage.
  */
  atualizarCarrinho();
});