import { useState } from "react";
import { Clear } from "../styles/generalStyles";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import AddLoanDialog from "../components/loans/addLoanDialog";
import FilterLoanDialog from "../components/loans/filterLoanDialog";
import { Loading } from "../styles/generalStyles";
import { CircularProgress } from "@mui/material";
import GenericSnackbar from "../components/generics/genericSnackbar";

export default function LoansPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCloseDialog() {
    setOpenSearch(false);
    setOpenAdd(false);
  }
  return (
    <>
      <Clear>Limpar filtros (32)</Clear>
      <CardsContainer>
        <Card
          subtitle="Novo"
          title="Registro"
          iconName="add-circle-outline"
          action={() => setOpenAdd(true)}
        />
        <Card
          subtitle="Configurações de"
          title="Busca"
          iconName="search-outline"
          action={() => setOpenSearch(true)}
        />
        <Card contrast subtitle="Total" number={"200,00"} money={true} />
      </CardsContainer>
      <GenericSnackbar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
      <AddLoanDialog
        setLoading={setLoading}
        openDialog={openAdd}
        handleCloseDialog={handleCloseDialog}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
      />
      <FilterLoanDialog
        setLoading={setLoading}
        openDialog={openSearch}
        handleCloseDialog={handleCloseDialog}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
      />
    </>
  );
}
