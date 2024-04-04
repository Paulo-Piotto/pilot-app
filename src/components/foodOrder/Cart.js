import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

import CartItem from "./cartItem";
import sendMessage from "./sendMessage";
import { intToMoney } from "../../services/utils/format";

const estilo = {
  p: 0,
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export default function Cart({ cart, setCart }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function sumTotal(ordersArray) {
    let total = 0;

    ordersArray.forEach((order) => {
      total += order.type.value;
    });

    return total;
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Carrinho</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Carrinho"}</DialogTitle>
        <DialogContent sx={{ width: 550, height: 240 }}>
          <List sx={estilo} aria-label="mailbox folders">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} cart={cart} setCart={setCart} />
            ))}
          </List>
        </DialogContent>
        <Rodape>
          <ListItemText
            primary={`Itens: ${cart.length}`}
            sx={{ marginLeft: 7 }}
          />
          <ListItemText
            primary={`Total: R$ ${intToMoney(sumTotal(cart))}`}
            sx={{ marginLeft: 23 }}
          />
        </Rodape>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Voltar
          </Button>
          <Button onClick={() => sendMessage(cart)} autoFocus>
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Rodape = styled.div`
  background-color: "background.paper";
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #b2babb;
`;
