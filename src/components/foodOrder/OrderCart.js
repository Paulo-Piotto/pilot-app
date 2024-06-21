import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { MenuItem } from "@mui/material";

import { useState, useEffect } from "react";
import { intToMoney } from "../../services/utils/format";
import Cart from "./Cart";
import { FaShoppingBasket } from "react-icons/fa";

export default function OrderCart({
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
  setEmployees,
  setMenu,
  userData,
  EmployeesService,
  FoodControlService,
  menu,
  employee,
  setEmployee,
  employeeError,
  employees,
  typeError,
  type,
  setType,
  value,
  setValue,
  setValueError,
  ClientsService,
}) {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = useState(0);
  const [clients, setClients] = useState([]);
  const [clientError, setClientError] = useState(false);
  const [cart, setCart] = useState([]);

  function AddItem() {
    setCart([...cart, { client, employee, type, value }]);
    setClient(0);
    setEmployee(0);
    setType(0);
  }

  async function getData() {
    try {
      const employeesResp = await EmployeesService.getEmployees();
      const menuResp = await FoodControlService.getMenu(userData.token);
      const clientsResp = await ClientsService.getAllClients(userData);
      setEmployees(employeesResp.data);
      setMenu(menuResp.data);
      setClients(clientsResp.data);
    } catch (error) {
      setSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Algo deu errado...");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CartButton onClick={handleClickOpen}>
        {" "}
        <CartIcon variant="outlined"></CartIcon>
      </CartButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Pedido"}</DialogTitle>
        <DialogContent>
          <Stack sx={{ width: 500, height: 260 }}>
            <TextField
              id="outlined-select-employee"
              sx={{ mt: 3, mr: 1, mb: 1 }}
              select
              error={employeeError}
              fullWidth
              label="Funcionário"
              defaultValue={0}
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <MenuItem key={0} value={0} sx={{ fontSize: 15 }}>
                {"Escolha um Funcionário"}
              </MenuItem>
              {employees.map((employee, index) => (
                <MenuItem key={index} value={employee} sx={{ fontSize: 15 }}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-type"
              sx={{ mt: 1, mr: 1, mb: 1 }}
              select
              fullWidth
              error={typeError}
              label="Opção"
              defaultValue={0}
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setValue(intToMoney(e.target.value.value || 0));
                setValueError(false);
              }}
            >
              <MenuItem value={0} sx={{ fontSize: 15 }}>
                {"Escolha um Tipo"}
              </MenuItem>
              {menu.map((item, index) => (
                <MenuItem key={index} value={item} sx={{ fontSize: 15 }}>
                  {`${item.name} ${item.description}`}
                </MenuItem>
              ))}
              <MenuItem value={"Outro"} sx={{ fontSize: 15 }}>
                {"Outro"}
              </MenuItem>
            </TextField>
            <TextField
              id="outlined-select-client"
              sx={{ mt: 1, mr: 1, mb: 1 }}
              select
              fullWidth
              error={clientError}
              label="Obra"
              defaultValue={0}
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <MenuItem key={0} value={0} sx={{ fontSize: 15 }}>
                {"Escolha uma Obra"}
              </MenuItem>
              {clients.map((client) => (
                <MenuItem key={client.id} value={client} sx={{ fontSize: 15 }}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Cart cart={cart} setCart={setCart}></Cart>
          <Button onClick={AddItem}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const CartButton = styled.div`
  position: absolute;
  top: calc(50% - 3.25vh);
  right: 7.5%;
  height: 6.5vh;
  width: 6.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const CartIcon = styled(FaShoppingBasket)`
  color: #eaeaea;
  font-size: 23px;
`;
