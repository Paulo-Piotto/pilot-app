function sendMessage(cart) {
  let valorTotal = 0;
  const d = new Date();
  let text = d.toLocaleDateString();
  let mensagem = `
    *Pedido PIOTTO - ${text}*

Itens:
   
---------------------------
   `;

  cart.forEach((item) => {
    mensagem += `
      *Produto:* ${item.title}

      *Preço: R$ ${item.price}*

      ---------------------------
        `;
    valorTotal += item.price;
  });

  mensagem += `
      *TOTAL: R$ ${valorTotal.toFixed(2)}*

        `;

  mensagem = encodeURI(mensagem);
  window.location.href = `https://wa.me/5514998812492?text=${mensagem}`;
}

export default sendMessage;
