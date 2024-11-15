import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../../Dashboard/style";
import { Link } from "react-router-dom";
import SidebarUser from "../Sidebar/sidebarUser";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useJwt } from "react-jwt";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import imovel from "../../../assets/Videos/imovel.mp4";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  filtro: {
    marginBottom: theme.spacing(3),
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      overflowX: "auto",
      display: "block",
    },
  },
  th: {
    padding: "10px 15px",
    borderBottom: "1px solid #d1d1d1",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color: "black",
  },
  secondaryText: {
    color: "#aaa",
    display: "block",
  },
  card: {
    color: "white",

    marginTop: "4px",

    width: "80%",
    textAlign: "center",
    borderRadius: "5px",
    backgroundColor: "orange",
  },
  videoBackground: {
    position: "fixed",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    zIndex: "-1",
    transform: "translate(-50%, -50%)",
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
  icon: {
    color: "#FFFF",
  },
}));

function ListaImoveisUser() {
  const classes = useStyles();
  const [imoveis, setImoveis] = useState([]);

  const [filtro, setFiltro] = useState("");

  const [imoveisPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);

  useEffect(() => {
    const fetchImoveisEContratos = async () => {
      try {
        if (decodedToken && decodedToken.userId) {
          const responseImoveis = await API_URL.get(
            `/pessoa/${decodedToken.userId}`
          );
          const imoveisData = responseImoveis?.data?.imoveisRelacionados;

          setImoveis(imoveisData);
        } else {
          console.error(
            "Token não contém ID do usuário ou não foi decodificado corretamente."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis e contratos:", error);
      }
    };

    fetchImoveisEContratos();
  }, [decodedToken]);

  const filteredImoveis = imoveis.filter((imovel) => {
    return (
      imovel.id.toString().includes(filtro) ||
      (imovel.pessoas &&
        imovel.pessoas.some((pessoa) =>
          pessoa.nome.toLowerCase().includes(filtro.toLowerCase())
        )) ||
      (imovel.localizacao &&
        (imovel.localizacao.endereco
          .toLowerCase()
          .includes(filtro.toLowerCase()) ||
          (imovel.localizacao.cidade &&
            imovel.localizacao.cidade
              .toLowerCase()
              .includes(filtro.toLowerCase())) ||
          (imovel.localizacao.estado &&
            imovel.localizacao.estado
              .toLowerCase()
              .includes(filtro.toLowerCase())))) ||
      (imovel.proprietario &&
        imovel.proprietario.nome &&
        imovel.proprietario.nome.toLowerCase().includes(filtro.toLowerCase()))
    );
  });

  const indexOfLastImovel = currentPage * imoveisPerPage;
  const indexOfFirstImovel = indexOfLastImovel - imoveisPerPage;
  const currentImoveis = filteredImoveis.slice(
    indexOfFirstImovel,
    indexOfLastImovel
  );
  console.log(currentImoveis);

  return (
    <div>
      <DashboarDiv>TS Administradora - Imóveis</DashboarDiv>
      <SidebarUser />
      <Container className={classes.root}>
        <video
          autoPlay="autoplay"
          loop="loop"
          muted
          className={classes.videoBackground}
        >
          <source src={imovel} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        <div className={classes.filtro}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon className={classes.icon} />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textFieldBranco}
                label="Pesquisar"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                variant="standard"
              />
            </Grid>
          </Grid>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.th}>ID</TableCell>
              <TableCell className={classes.th}>Localização</TableCell>
              <TableCell className={classes.th}>
                <AttachMoneyIcon /> Valor de Venda
              </TableCell>
              <TableCell className={classes.th}>
                <AttachMoneyIcon /> Valor de Aluguel
              </TableCell>
              <TableCell className={classes.th}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentImoveis.map((imovel) => (
              <TableRow key={imovel?.registroImovel?.id} className={classes.tr}>
                <TableCell className={classes.td}>
                  <Link to={`/user/imovel/${imovel?.registroImovel?.id}`}>
                    {imovel?.registroImovel?.id}
                  </Link>
                </TableCell>
          
                <TableCell className={classes.td}>
                  <HomeIcon />
                  {`${imovel?.registroImovel?.generoImovel} no ${imovel?.registroImovel?.localizacao?.bairro}, ${imovel?.registroImovel?.localizacao?.endereco} N ${imovel?.registroImovel?.localizacao?.numero}, Complemento: ${imovel?.registroImovel?.localizacao?.andar}, Bairro: ${imovel?.registroImovel?.localizacao?.bairro}`}
                  <span className={classes.secondaryText}>
                    {`${imovel?.registroImovel?.localizacao?.cidade}, ${imovel?.registroImovel?.localizacao?.estado}`}
                  </span>
                </TableCell>
                <TableCell className={classes.td}>
                  {imovel.registroImovel?.negociacao?.valores?.valorVenda &&
                  imovel.registroImovel?.negociacao?.valores?.valorVenda !== "0"
                    ? `R$ ${imovel.registroImovel?.negociacao?.valores?.valorVenda}`
                    : imovel.registroImovel?.negociacao?.valores
                        ?.vendaealuguelVenda &&
                      imovel.registroImovel?.negociacao?.valores
                        ?.vendaealuguelVenda !== "0"
                    ? `R$ ${imovel?.registroImovel.negociacao?.valores?.vendaealuguelVenda}`
                    : "Imóvel não é para venda"}
                </TableCell>
                <TableCell className={classes.td}>
                  {imovel.registroImovel?.negociacao?.valores?.valorAluguel &&
                  imovel.registroImovel?.negociacao?.valores?.valorAluguel !==
                    "0"
                    ? `R$ ${imovel.registroImovel?.negociacao?.valores?.valorAluguel}`
                    : imovel.registroImovel?.negociacao?.valores
                        ?.vendaealuguelAluguel &&
                      imovel.registroImovel?.negociacao?.valores
                        ?.vendaealuguelAluguel !== "0"
                    ? `R$ ${imovel.registroImovel?.negociacao?.valores?.vendaealuguelAluguel}`
                    : "Imóvel não é para aluguel"}
                </TableCell>
           
                <TableCell>
                  <div className={classes.card}>
                    {imovel?.registroImovel?.inquilinos &&
                    imovel?.registroImovel?.inquilinos.length > 0
                      ? `Locador principal ${
                          imovel?.registroImovel?.inquilinos[0].pessoa
                            ? imovel?.registroImovel?.inquilinos[0].pessoa
                                .nome ||
                              (imovel?.registroImovel?.inquilinos[0]
                                .pessoaJuridica
                                ? imovel?.registroImovel?.inquilinos[0]
                                    .pessoaJuridica?.razaoSocial ||
                                  "Nome da Pessoa Jurídica não disponível"
                                : "Nome não disponível")
                            : imovel?.registroImovel?.inquilinos[0]
                                .pessoaJuridica
                            ? imovel?.registroImovel?.inquilinos[0]
                                .pessoaJuridica?.razaoSocial ||
                              "Nome da Pessoa Jurídica não disponível"
                            : "Nome não disponível"
                        }`
                      : "Imóvel vazio"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          shape="rounded"
          variant="outlined"
          count={Math.ceil(filteredImoveis.length / imoveisPerPage)}
          page={currentPage}
          onChange={(event, newPage) => setCurrentPage(newPage)}
          classes={{ ul: useStyles().pagination }}
        />
      </Container>
    </div>
  );
}
export default ListaImoveisUser;
