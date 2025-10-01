document.addEventListener('DOMContentLoaded', () => {
  // --- SELETORES DE ELEMENTOS ---
  const abrirCarrinhoBtn = document.getElementById('abrirCarrinho');
  const painelCarrinho = document.querySelector('.painel-carrinho');
  const listaCarrinho = document.getElementById('lista-carrinho');
  const contadorCarrinho = document.getElementById('contador-carrinho');
  const totalElemento = document.getElementById('total');
  const botoesComprar = document.querySelectorAll('.card button');
  const botaoFinalizar = document.getElementById('finalizar');
  // --- LÓGICA DO MENU HAMBURGUER ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('nav-aberta');
    });
  }
  // --- LÓGICA PARA ABRIR E FECHAR O PAINEL DO CARRINHO ---
  if (abrirCarrinhoBtn && painelCarrinho) {
    abrirCarrinhoBtn.addEventListener('click', () => {
      painelCarrinho.classList.toggle('aberto');
    });
  }

  // --- LÓGICA PARA FECHAR O CARRINHO AO CLICAR FORA ---
document.addEventListener('click', (event) => {
  const isClickInsideCart = painelCarrinho.contains(event.target);
  const isCartButton = abrirCarrinhoBtn.contains(event.target);

  if (painelCarrinho.classList.contains('aberto') && !isClickInsideCart && !isCartButton) {
    painelCarrinho.classList.remove('aberto');
  }
});
  // --- LÓGICA PRINCIPAL DO CARRINHO DE COMPRAS ---

  // Pega o carrinho salvo no navegador (localStorage) ou cria um array vazio
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Função para salvar o carrinho no localStorage
  function salvarCarrinhoStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // Função para atualizar a exibição do carrinho na tela
  function atualizarCarrinho() {
  // 1. Atualiza o contador em TODAS as páginas
  contadorCarrinho.textContent = carrinho.length;

  // 2. Salva o estado atual no localStorage
  salvarCarrinhoStorage();

  // 3. Só tenta atualizar a lista detalhada e o total se os elementos existirem
  if (listaCarrinho && totalElemento) {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}`;
      listaCarrinho.appendChild(li);
      total += item.preco;
    });

    totalElemento.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}
  // Adiciona o evento de clique para cada botão "Comprar"
  botoesComprar.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const nome = card.querySelector('h3').textContent;
      const precoTexto = card.querySelector('span').textContent.replace('R$', '').replace(',', '.');
      const preco = parseFloat(precoTexto);

      // Adiciona o item ao array do carrinho
      carrinho.push({ nome, preco });
      // Atualiza a exibição
      atualizarCarrinho();
    });
  });

  // Adiciona o evento para o botão "Finalizar Pedido"
  if (botaoFinalizar) {
    botaoFinalizar.addEventListener('click', () => {
      if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }

      alert('🎉 Pedido finalizado com sucesso! Obrigado por comprar com a Sra. Cookies 🍪');

      // Limpa o carrinho
      carrinho = [];
      atualizarCarrinho();
    });
  }

  // Chama a função uma vez ao carregar a página para mostrar itens que já estavam salvos
  atualizarCarrinho();
});