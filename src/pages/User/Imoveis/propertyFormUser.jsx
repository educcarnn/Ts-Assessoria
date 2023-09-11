import React, { useState } from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@material-ui/core";
import ResidencialForm from "../../Dashboard/Imoveis/ResidencialForm";
import ComercialForm from "../../Dashboard/Imoveis/ComercialForm";
import { LocationFields } from "../../../components/Imoveis/LocationFields.jsx";
import ProprietyFields from "../../../components/Imoveis/ProprietyFields.jsx";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { DashboarDiv } from "../../Dashboard/style";
import CaracteristicasCondominio from "../../../components/Imoveis/TipsComponents/CaracateristicasCondominio.jsx";
import CaracteristicasImovel from "../../../components/Imoveis/TipsComponents/CaracteristicasImovel.jsx";
import { useFormularioContext } from "../../../context/CadastroProvider.js"; // Importar o contexto aqui
import TipoNegociacao from "../../../components/Imoveis/TipsNegociation.jsx";
import Isencao from "../../../components/Imoveis/TipsNegociation/Isencao.jsx";
import Sidebar from "../../../components/DashboardComponents/Sidebar/index.jsx";
import imovel from "../../../assets/Videos/imovel.mp4";
import { useModal } from '../../../context/ModalContext.js';
import SidebarUser from "../Sidebar/sidebarUser";
import ProprietyFieldsUser from "./components/PropertyFieldsUser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    minHeight: "100vh",
    fontSize: "0.8rem",
    width: "100%",
    color: "black", // Altera a cor do texto para preto
  },
  formBox: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    padding: "20px",
    width: "100%",
  },
  actionButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "teal",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  switchText: {
    margin: "0 1rem",
  },
  videoBackground: {
    position: "fixed",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",

    transform: "translate(-50%, -50%)",
  },
}));

const BlackText = styled(FormLabel)`
  color: black;
  font-weight: bold;
`;

const Container = styled.div`
  background-color:#f5f5f5db;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const PropertyFormUser = () => {
  const classes = useStyles();
  const { isModalOpen } = useModal(); 
  const [] = useState(false);

  const { dadosFormulario, setDadosFormulario, enviarFormulario } =
    useFormularioContext(); 
  const [propertyType, setPropertyType] = useState(""); 

  const handlePropertyTypeChange = (event) => {
    const newPropertyType = event.target.value;
    setPropertyType(newPropertyType);

    setDadosFormulario((prevData) => ({
      ...prevData,
      tipoImovel: newPropertyType,
    }));

   
  };

  const handleAddImovel = () => {
    const novoImovel = dadosFormulario;

    enviarFormulario(novoImovel);
  };

  return (
    <div>
      <DashboarDiv variant="h4">
        Ts Administradora - Lista de Imóvel
      </DashboarDiv>
      {!isModalOpen && <SidebarUser />} 
      {!isModalOpen && (
        <video className={classes.videoBackground} autoPlay loop muted>
          <source src={imovel} type="video/mp4" />
          Seu navegador não suporta vídeos em formato HTML5.
        </video>
      )}
      <div className={classes.root}>
        <Container>
          <div className={classes.switchContainer}>
            <BlackText>Tipo de Imóvel</BlackText>
            <FormControl>
              <Select value={propertyType} onChange={handlePropertyTypeChange}>
                <MenuItem value="Comercial">Comercial</MenuItem>
                <MenuItem value="Residencial">Residencial</MenuItem>
              </Select>
            </FormControl>
          </div>
          {propertyType === "Residencial" ? (
            <ResidencialForm />
          ) : (
            <ComercialForm />
          )}

          <TipoNegociacao />
          <Isencao />
          <ProprietyFieldsUser />
          <LocationFields />
          <CaracteristicasImovel />
          <CaracteristicasCondominio />
          <button className={classes.actionButton} onClick={handleAddImovel}>
            Adicione Imóvel
          </button>
        </Container>
      </div>
    </div>
  );
};

export default PropertyFormUser;