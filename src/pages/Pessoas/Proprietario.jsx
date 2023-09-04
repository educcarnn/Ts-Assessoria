import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { API_URL } from "../../db/Api";
import { DashboarDiv } from "../Dashboard/style";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import Sidebar from "../../components/DashboardComponents/Sidebar";
import Clientes from "../../assets/Videos/fundoClientes.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ModalPessoaFisica from "../Dashboard/Cadastro/UsuarioInfo/components/modalPessoaFísica";
import { toast } from "react-toastify";
import {IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px auto",
    maxWidth: "95%",
    padding: "20px",
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
  },
  filtro: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "10px 15px",
    borderBottom: "1px solid #d1d1d1",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: "10px 15px",
    borderBottom: "1px solid #d1d1d1",
  },
  tr: {
    backgroundColor: "#EAEAEA",
    "&:hover": {
      backgroundColor: "#D3D3D3",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#DCDCDC",
    },
  },
  textFieldBranco: {
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid white",
    },
  },
  pageBackground: {
    backgroundImage: `url(${Clientes})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  },
}));

export default function Proprietario() {
  const classes = useStyles();
  const [pessoas, setPessoas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("id"); // Define a ordenação padrão por ID
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await API_URL.get("/obter-novas-pessoas");
        const proprietarios = response.data.filter(
          (person) => person.funcao === "Proprietário"
        );
        setPessoas(proprietarios);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    };
    fetchPessoas();
  }, []);

  const filtradosEOrdenados = pessoas
    .filter((person) => {
      return (
        person.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        person.id.toString() === filtro ||
        person.telefoneCelular.includes(filtro)
      );
    })
    .sort((a, b) => {
      if (ordenacao === "imoveis") {
        return (
          (b.imoveisProprietarios ? b.imoveisProprietarios.length : 0) -
          (a.imoveisProprietarios ? a.imoveisProprietarios.length : 0)
        );
      }
      return a.id - b.id;
    });

  const handleDelete = async (id) => {
    try {
      await API_URL.delete(`/pessoa-delete/${id}`);
      setPessoas(pessoas.filter((person) => person.id !== id));
      toast.success("Pessoa deletada com sucesso!"); // Corrigido aqui
    } catch (error) {
      toast.error("Erro ao deletar pessoa.");
      console.error("Erro detalhado:", error); // Se você quiser ver o erro completo no console.
    }
  };

  return (
    <div>
      <DashboarDiv>TS Administradora - Lista de Proprietários</DashboarDiv>
      <Sidebar />
      <Container className={classes.root}>
        <div className={classes.filtro}>
          <div className={classes.pageBackground}></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <TextField
                className={classes.textFieldBranco}
                label="Pesquisar"
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Nome, ID ou Telefone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={classes.textFieldBranco}/>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton color="primary" onClick={handleOpen}>
                <AddIcon className={classes.textFieldBranco}/>
              </IconButton>
              <ModalPessoaFisica open={modalOpen} handleClose={handleClose} />
            </div>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              style={{ marginLeft: "15px" }}
            >
              <option value="id">Ordenar por ID</option>
              <option value="imoveis">Ordenar por Mais Imóveis</option>
            </select>
          </div>
        </div>

        {filtradosEOrdenados.length === 0 ? (
          <p className={classes.textFieldBranco}>
            Não há proprietários registrados.
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="lista de proprietários"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.th}>ID</TableCell>
                  <TableCell className={classes.th}>Nome Completo</TableCell>
                  <TableCell className={classes.th}>CPF</TableCell>
                  <TableCell className={classes.th}>Profissão</TableCell>
                  <TableCell className={classes.th}>Função</TableCell>
                  <TableCell className={classes.th}>Telefone Fixo</TableCell>
                  <TableCell className={classes.th}>Telefone Celular</TableCell>
                  <TableCell className={classes.th}>E-mail</TableCell>
                  <TableCell className={classes.th}>Imóveis</TableCell>
                  <TableCell className={classes.th}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtradosEOrdenados.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className={classes.td}>
                      <Link to={`/admin/obter-usuario/${person.id}`}>
                        {person.id}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.td}>
                      <Link to={`/admin/obter-usuario/${person.id}`}>
                        {person.nome}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.td}>{person.cpf}</TableCell>
                    <TableCell className={classes.td}>
                      {person.profissao}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.funcao}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.telefoneCelular}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.telefoneFixo}
                    </TableCell>
                    <TableCell className={classes.td}>{person.email}</TableCell>
                    <TableCell className={classes.td}>
                      {person.imoveisProprietarios
                        ? person.imoveisProprietarios.length
                        : 0}
                    </TableCell>
                    <TableCell className={classes.td}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(person.id)}
                      >
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}
