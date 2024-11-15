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
import { API_URL } from "../../../../../../db/Api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  imageContainer: {
    position: "relative",
  },
  button: {
    backgroundColor: "#1976d2 !important",
    color: "white !important",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

function AnexosDocumentos({ anexos }) {
  const classes = useStyles();

  const [listaAnexos, setListaAnexos] = useState(anexos.listaAnexos);

  const handleAdicionarAnexo = async (novoAnexo) => {
    if (!novoAnexo) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imovelId", anexos.idImovel.toString());
      listaAnexos.forEach((anexo) => {
        formData.append("listaAnexos", anexo.listaAnexos);
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

  const handleFileChange = (event) => {
    const novoAnexo = event.target.files[0];
    handleAdicionarAnexo(novoAnexo);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Anexos de Documentos:
      </Typography>
      {listaAnexos.length === 0 ? (
        <Typography variant="h6">(Sem documentos)</Typography>
      ) : (
        <List>
          {listaAnexos.map((anexo) => (
            <ListItem key={anexo.id}>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.card}>
                <div className={classes.imageContainer}>
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleExcluirAnexo(anexo.idImovel, anexo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <a
                    href={anexo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.linkStyle}
                  >
                    {`Anexo: ${anexo.id}`}
                  </a>
                </div>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <input
          className={classes.input}
          id="contained-button-file"
          type="file"
          accept="application/pdf,image/jpeg"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Selecione um Anexo
          </Button>
        </label>
      </Grid>
    </>
  );
}

export default AnexosDocumentos;
