import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import styled from "styled-components";

export default function CartItem({ item, cart, setCart }) {
  // function RemoveItem() {
  //   const update = cart.filter((item) => item.indice !== indice);
  //   setCart(update);
  // }

  return (
    <>
      <ListItem sx={{ marginLeft: 2 }}>
        <ListItemText primary={item.type.name} />
        <ListItemText primary={"R$ " + item.value} />
        <ListItemText primary={item.employee.name} />
        <ListItemText
          primaryTypographyProps={{
            style: {
              maxWidth: "13ch",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
          primary={"Obra: " + item.client.name}
        />
        <Remove>
          <DeleteOutlinedIcon
            sx={{ color: "#4D5656", marginLeft: 2, fontSize: 22 }}
          />
        </Remove>
      </ListItem>
      <Divider component="li" />{" "}
    </>
  );
}

const Remove = styled.div`
  position: relative;
`;
