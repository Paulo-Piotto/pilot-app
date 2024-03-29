import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import sendMessage from "./sendMessage";

const estilo = {
  p: 0,
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export default function Cart() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            {/* <ListItem sx={{ marginLeft: 2 }}>
              <ListItemText primary="Marmita G" />
              <ListItemText primary="R$ 19,00" />
              <ListItemText primary="Luisa" />
              <ListItemText primary="Obra: Ácacio" />
            </ListItem>
            <Divider component="li" /> */}
          </List>
        </DialogContent>
        <Rodape>
          <ListItemText primary="Itens:" sx={{ marginLeft: 7 }} />
          <ListItemText primary="Total: R$" sx={{ marginLeft: 23 }} />
        </Rodape>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Voltar
          </Button>
          <Button onClick={sendMessage} autoFocus>
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
