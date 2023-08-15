import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProperties from "../pages/AddProperties";
import PessoaFisica from "../pages/Dashboard/Cadastro/PessoaFisica"
import PessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica";
import PropertyForm from "../pages/Dashboard/Imoveis/PropertyForm";
import NovoContrato from "../pages/Dashboard/Contratos/NovoContrato";
import { MultiStepProvider } from "../context/MultiStepProvider";
import { NegociacaoProvider } from "../context/NegociationProvider";
import CadastroLista from "../components/Form/CadastroLista";
import ListaPessoaFisica from "../pages/Dashboard/Cadastro/ListaPessoaFisica";
import ListaPessoaJuridica from "../pages/Dashboard/Cadastro/ListaPessoaJuridica";

export const Routes = () => {
  return (
    <BrowserRouter>
      <MultiStepProvider>
        <NegociacaoProvider>
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
            <Route exact path="/cadastro-lista">
              <CadastroLista />
            </Route>
            <Route exact path="/clientes-pessoa-fisica">
              <PessoaFisica />
            </Route>
            <Route exact path="/clientes-pessoa-juridica">
              <PessoaJuridica />
            </Route>
            <Route exact path="/lista-pessoa-fisica">
              <ListaPessoaFisica />
            </Route>
            <Route exact path="/lista-pessoa-juridica">
              <ListaPessoaJuridica />
            </Route>
            <Route exact path="/novo-contrato">
              <NovoContrato />
            </Route>
          </Switch>
        </NegociacaoProvider>
      </MultiStepProvider>
    </BrowserRouter>
  );
};
