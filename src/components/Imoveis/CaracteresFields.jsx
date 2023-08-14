import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Grid,
  Paper,
  Typography,
  Container,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerBlock: {
    display: "flex",
    gap: "5%",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center", // Centraliza o conteúdo na horizontal
  },
  input: {
    color: "black", // Altera a cor do texto dos inputs para preto
  },
  outlinedInput: {
    borderColor: "black", // Adiciona a cor da borda para o estilo outlined
  },
  container: {
    display: "flex",
    justifyContent: "center", // Centraliza o conteúdo na vertical
    alignItems: "center", // Centraliza o conteúdo na horizontal
    height: "100vh", // Define a altura da área centralizada
  },
}));

export default function CaracteresFields() {
  const classes = useStyles();

  const [buildingType, setBuildingType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [suites, setSuites] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [areaTotal, setAreaTotal] = useState("");

  const handleBuildingTypeChange = (event) => {
    setBuildingType(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleSuitesChange = (event) => {
    setSuites(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handleParkingSpacesChange = (event) => {
    setParkingSpaces(event.target.value);
  };

  const handleAreaUtilChange = (event) => {
    setAreaUtil(event.target.value);
  };

  const handleAreaTotalChange = (event) => {
    setAreaTotal(event.target.value);
  };

  return (
    <Grid container spacing={2} style={{ width: "50%" }}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Características da Construção</Typography>
          <FormControl className={classes.formControl} fullWidth>
            <FormLabel>Tipo de Construção</FormLabel>
            <Select value={buildingType} onChange={handleBuildingTypeChange}>
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value="padrao">Padrão</MenuItem>
              <MenuItem value="duplex">Duplex</MenuItem>
              <MenuItem value="triplex">Triplex</MenuItem>
            </Select>
          </FormControl>
          <Container className={classes.containerBlock}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Quartos</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={bedrooms}
                onChange={handleBedroomsChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Sendo Suítes</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={suites}
                onChange={handleSuitesChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>
          </Container>

          <Container className={classes.containerBlock}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Banheiros</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={bathrooms}
                onChange={handleBathroomsChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>

            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Vagas</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={parkingSpaces}
                onChange={handleParkingSpacesChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>
          </Container>

          <Container className={classes.containerBlock}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Área Útil (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={areaUtil}
                onChange={handleAreaUtilChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Área Total (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }} // Adiciona a classe para o estilo outlined
                type="text"
                value={areaTotal}
                onChange={handleAreaTotalChange}
                variant="outlined" // Define o estilo como outlined
              />
            </FormControl>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
