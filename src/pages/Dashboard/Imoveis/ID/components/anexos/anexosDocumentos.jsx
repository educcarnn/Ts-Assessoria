import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { API_URL } from "../../../../../../db/Api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: "#1976d2 !important",
    color: "white !important",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

function AnexosDocumentos({ anexos }) {
  const classes = useStyles();
  console.log(anexos);
  const [listaAnexos, setListaAnexos] = useState(anexos.listaAnexos);
  const [novoAnexo, setNovoAnexo] = useState(null);


  const handleAdicionarAnexo = async () => {
    if (!novoAnexo) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imovelId", anexos.idImovel.toString());
      listaAnexos.forEach((anexos) => {
        formData.append("listaAnexos", anexos.listaAnexos);
      });

      // Adicionando novo anexo
      formData.append("listaAnexos", novoAnexo);

      const response = await API_URL.post(
        "/adicionar-anexos-imovel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const anexosAdicionados = response.data.anexos;

      setListaAnexos(anexosAdicionados);
      setNovoAnexo(null);
      toast.success("Anexo adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar anexo:", error);
      toast.error("Erro ao adicionar anexo.");
    }
  };

  const handleExcluirAnexo = async (imovelId, anexoId) => {
    try {
      const body = {
        imovelId: imovelId,
        anexoId: anexoId,
      };

      await API_URL.delete("/remover-anexos-imovel", { data: body });

      setListaAnexos((prevLista) => {
        const updatedList = prevLista.filter((anexo) => anexo.id !== anexoId);
        return updatedList;
      });

      toast.success("Anexo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir anexo:", error);
      toast.error("Erro ao excluir anexo. Tente novamente.");
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Anexos de documentos:
      </Typography>
      <List>
        {listaAnexos.map((anexo) => (
          <ListItem key={anexo.id}>
            <ListItemText
              primary={
                <a href={anexo.url} target="_blank" rel="noopener noreferrer">
                  Anexo: {anexo.id}
                </a>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleExcluirAnexo(anexo.idImovel, anexo.id)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <input
            className={classes.input}
            id="contained-button-file"
            type="file"
            accept="application/pdf,image/jpeg"
            onChange={(e) => setNovoAnexo(e.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Selecione um Anexo
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
        
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdicionarAnexo}
            fullWidth
            className={classes.button}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AnexosDocumentos;