import { HashRouter, Routes } from "react-router-dom";
import Main from "./components/main";
import Auth from "./components/auth";
import AuthContext from "./components/context/AuthContext";
import { useContext } from "react";
import Censorship from "./services/censorship";

function App() {
  const { userData } = useContext(AuthContext)

  if(!userData || !userData.token) return <Auth />
  return (
      <HashRouter>
        <Main />
        <Routes>{ Censorship(userData) }</Routes>
      </HashRouter>
  );
}

export default App;
