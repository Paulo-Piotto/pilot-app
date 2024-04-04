import { intToMoney } from "../../services/utils/format";

function sendMessage(cart) {
  let valorTotal = 0;
  const d = new Date();
  let text = d.toLocaleDateString();

  let mensagem = `
    *Pedido PIOTTO - ${text}*

Itens: ${cart.length}
   `;

  cart.forEach((item) => {
    mensagem += `
*1x - ${item.type.name} - ${item.type.description}*

Funcionário: ${item.employee.name}
Entrega: ${item.client.address}

*R$ ${item.value}*

*---------------------------*
        `;
    valorTotal += item.type.value;
  });

  mensagem += `
*TOTAL: R$ ${intToMoney(valorTotal)}*

        `;

  mensagem = encodeURI(mensagem);
  window.location.href = `https://wa.me/5514998812492?text=${mensagem}`;
}

export default sendMessage;
