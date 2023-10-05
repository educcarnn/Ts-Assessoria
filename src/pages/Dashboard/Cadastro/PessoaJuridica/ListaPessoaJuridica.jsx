import React, { useState, useEffect } from "react";
import { DashboarDiv } from "../../style";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Clientes from "../../../../assets/Videos/fundoClientes.png";
import Sidebar from "./componentsLista/sidebar/sidebar";
import { API_URL } from "../../../../db/Api";
import TextField from "@material-ui/core/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from "react-toastify";

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
  pagination: {
    marginTop: theme.spacing(3),
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
    "& .MuiPaginationItem-root": {
      color: "#fff",
      borderColor: "#fff",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#fff", // Fundo branco para o item selecionado
      color: "#000", // Letra preta para o item selecionado
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Um tom mais claro de preto ao passar o mouse
      },
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
}));

const ITEMS_PER_PAGE = 10;

export default function ListaPessoaJuridica() {
  const classes = useStyles();
  const [filtro, setFiltro] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordenacao, setOrdenacao] = useState("id");

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await API_URL.get(`/obter-novas-pessoas-juridica`);

        setPessoas(response.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    };

    fetchPessoas();
  }, []);

  const filtradosEOrdenados = pessoas
    .filter((person) => {
      return (
        person.razaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
        person.id.toString() === filtro ||
        person?.telefoneCelular?.includes(filtro)
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

  const displayItems = filtradosEOrdenados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (idPessoaJuridica, idIntermediario) => {

    try {
      const body = {
        idPessoaJuridica: idPessoaJuridica,
        idIntermediario: idIntermediario,
      };
  
      const response = await API_URL.delete("/pessoa-juridica-delete", {
        data: body,
      });
  
      if (response.status === 200) {
        setPessoas((prevPessoas) =>
          prevPessoas.filter((pessoa) => pessoa.id !== idPessoaJuridica)
        );
        toast.success("Pessoa jurídica deletada com sucesso!");
      } else {
        console.error(
          "Erro ao excluir pessoa jurídica. Status da resposta:",
          response.status
        );
        toast.error("Erro ao excluir pessoa jurídica. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir pessoa jurídica:", error);
      toast.error("Erro ao excluir pessoa jurídica. Tente novamente.");
    }
  };

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora - Lista de Pessoas Jurídicas</div>
      </DashboarDiv>
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
                      <SearchIcon className={classes.textFieldBranco} />
                    </InputAdornment>
                  ),
                }}
              />
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
            Não há pessoas jurídicas registrados.
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
                  <TableCell className={classes.th}>Razão Social</TableCell>
                  <TableCell className={classes.th}>CNPJ</TableCell>
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
                      <Link to={`/admin/obter-usuario-juridica/${person.id}`}>
                        {person.id}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.td}>
                      <Link to={`/admin/obter-usuario-juridica/${person.id}`}>
                        {person.razaoSocial}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.td}>{person.cnpj}</TableCell>

                    <TableCell className={classes.td}>
                      {person.dadosComuns && person.dadosComuns.funcao
                        ? person.dadosComuns.funcao.join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.dadosComuns && person.dadosComuns.telefoneCelular
                        ? person.dadosComuns.telefoneCelular
                        : "-"}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.dadosComuns && person.dadosComuns.telefoneFixo
                        ? person.dadosComuns.telefoneFixo
                        : "-"}
                    </TableCell>
                    <TableCell className={classes.td}>
                      {person.dadosComuns && person.dadosComuns.email
                        ? person.dadosComuns.email
                        : "-"}
                    </TableCell>

                    <TableCell className={classes.td}>
                      {person.imoveisRelacionadosJur
                        ? person.imoveisRelacionadosJur.length
                        : 0}
                    </TableCell>
                    <TableCell className={classes.td}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          handleDelete(person.id, person.dadosComunsId)
                        }
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
        <Pagination
          classes={{ ul: classes.pagination }}
          count={Math.ceil(filtradosEOrdenados.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(event, newPage) => setCurrentPage(newPage)}
          shape="rounded"
          variant="outlined"
        />
      </Container>
    </div>
  );
}
