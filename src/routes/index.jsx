import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProperties from "../pages/AddProperties";
import Cadastro from "../pages/Dashboard/Internas/Cadastro";
import PessoaJuridica from "../pages/Dashboard/Internas/Cadastro/PessoaJuridica";
import PropertyForm from "../pages/Dashboard/Internas/Imóveis/PropertyForm";
import NovoContrato from "../pages/Dashboard/Internas/Contratos/NovoContrato";
import { MultiStepProvider } from "../context/MultiStepProvider";

export const Routes = () => {
  return (
    <BrowserRouter>
      <MultiStepProvider>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/imoveis">
            <PropertyForm />
          </Route>
          <Route exact path="/cadastro">
            <AddProperties />
          </Route>
          <Route exact path="/clientes-pessoa-fisica">
            <Cadastro />
          </Route>
          <Route exact path="/clientes-pessoa-juridica">
            <PessoaJuridica />
          </Route>
          <Route exact path="/novo-contrato">
            <NovoContrato />
          </Route>
        </Switch>
      </MultiStepProvider>
    </BrowserRouter>
  );
};
