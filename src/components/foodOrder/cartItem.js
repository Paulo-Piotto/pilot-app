import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

export default function CartItem({ item }) {
  return (
    <>
      <ListItem sx={{ marginLeft: 2 }}>
        <ListItemText primary={item.type.name} />
        <ListItemText primary={"R$ " + item.value} />
        <ListItemText primary={item.employee.name} />
        <ListItemText primary={"Obra: " + item.client.name} />
      </ListItem>
      <Divider component="li" />{" "}
    </>
  );
}
