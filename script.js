// Lista de itens no carrinho
let carrinho = [];
let contador = 0;

// Seleciona o botão de abrir o carrinho
const abrirCarrinho = document.getElementById('abrirCarrinho');
const painelCarrinho = document.querySelector('.painel-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalCarrinho = document.getElementById('total');

// Abre/fecha o painel do carrinho
abrirCarrinho.addEventListener('click', () => {
  painelCarrinho.classList.toggle('aberto');
});

// Seleciona todos os botões "Comprar"
const botoesComprar = document.querySelectorAll('.card button');

// Evento para cada botão
botoesComprar.forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.parentElement;
    const nome = card.querySelector('h3').textContent;
    const precoTexto = card.querySelector('span').textContent;
    const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

    // Adiciona item ao carrinho
    carrinho.push({ nome, preco });
    contador++;
    atualizarCarrinho();
  });
});

// Atualiza o carrinho visual
function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}`;
    listaCarrinho.appendChild(li);
    total += item.preco;
  });

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  contadorCarrinho.textContent = contador;
}

document.addEventListener('DOMContentLoaded', () => {
  const carrinho = [];
  const listaCarrinho = document.getElementById('lista-carrinho');
  const contadorCarrinho = document.getElementById('contador-carrinho');
  const totalElemento = document.getElementById('total');
  const botoesComprar = document.querySelectorAll('.card button');
  const botaoFinalizar = document.getElementById('finalizar');

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      listaCarrinho.appendChild(li);
      total += item.preco;
    });

    contadorCarrinho.textContent = carrinho.length;
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  botoesComprar.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const nome = card.querySelector('h3').textContent;
      const precoTexto = card.querySelector('span').textContent.replace('R$', '').replace(',', '.');
      const preco = parseFloat(precoTexto);

      carrinho.push({ nome, preco });
      atualizarCarrinho();
    });
  });

  botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    // Aqui pode-se enviar os dados para um servidor ou API, se desejar.

    alert('🎉 Pedido finalizado com sucesso! Obrigado por comprar com a Sra. Cookies 🍪');

    // Limpar carrinho
    carrinho.length = 0;
    atualizarCarrinho();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const contadorCarrinho = document.getElementById('contador-carrinho');
  const totalElemento = document.getElementById('total');
  const botoesComprar = document.querySelectorAll('.card button');
  const botaoFinalizar = document.getElementById('finalizar');

  // Função para pegar o carrinho do localStorage
  function pegarCarrinhoStorage() {
    const carrinhoJSON = localStorage.getItem('carrinho');
    return carrinhoJSON ? JSON.parse(carrinhoJSON) : [];
  }

  // Função para salvar o carrinho no localStorage
  function salvarCarrinhoStorage(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  let carrinho = pegarCarrinhoStorage();

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      listaCarrinho.appendChild(li);
      total += item.preco;
    });

    contadorCarrinho.textContent = carrinho.length;
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;

    salvarCarrinhoStorage(carrinho);
  }

  botoesComprar.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const nome = card.querySelector('h3').textContent;
      const precoTexto = card.querySelector('span').textContent.replace('R$', '').replace(',', '.');
      const preco = parseFloat(precoTexto);

      carrinho.push({ nome, preco });
      atualizarCarrinho();
    });
  });

  botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    alert('🎉 Pedido finalizado com sucesso! Obrigado por comprar com a Sra. Cookies 🍪');

    // Limpar carrinho
    carrinho = [];
    atualizarCarrinho();
  });

  // Atualiza o carrinho ao carregar a página
  atualizarCarrinho();
});
