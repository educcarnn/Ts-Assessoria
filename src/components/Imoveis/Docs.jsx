import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  styled,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ModalImage from "react-modal-image";

const CenteredDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const TextPage = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
});

function Anexos() {
  const [documentos, setDocumentos] = useState([]);
  const [arquivoAtual, setArquivoAtual] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setArquivoAtual(file);

    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewImagem(url);
    } else {
      setPreviewImagem(null);
    }
  };

  const handleAdicionar = () => {
    if (arquivoAtual) {
      setDocumentos([...documentos, arquivoAtual]);
      setArquivoAtual(null);
      setPreviewImagem(null);
    }
  };

  const handleRemover = (index) => {
    const newDocs = [...documentos];
    newDocs.splice(index, 1);
    setDocumentos(newDocs);
  };

  return (
    <CenteredDiv>
      <Typography variant="h6">Anexar Documentos</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <IconButton color="primary" component="span">
              <AttachFileIcon />
            </IconButton>
          </label>

          <IconButton
            color="primary"
            onClick={handleAdicionar}
            disabled={!arquivoAtual}
          >
            <AddBoxIcon />
          </IconButton>
        </Grid>

        {previewImagem && (
          <Grid item xs={12} sm={4}>
            <ModalImage
              small={previewImagem}
              large={previewImagem}
              alt="Preview"
              hideDownload={true}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle1">Documentos anexados:</Typography>
          <List>
            {documentos.map((doc, index) => (
              <ListItem key={index}>
                <ListItemText primary={doc.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemover(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </CenteredDiv>
  );
}

export default Anexos;