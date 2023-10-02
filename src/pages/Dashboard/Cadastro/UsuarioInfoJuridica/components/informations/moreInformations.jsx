import React, { useEffect } from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import { useState } from "react";
import { API_URL } from "../../../../../../db/Api";

const MoreInformations = ({
  moreData,
  isEditing,
  handleMoreInformations,
  socios,
  setSocios,
  submit,
}) => {
  const [sociosEditados, setSociosEditados] = useState([]);
  const [sociosAtulizados, setSociosAtulizados] = useState([])
  const [novosSocios, setNovosSocios] = useState([]);

  const handleSocioNomeChange = (socioId, novoNome) => {
    const novaListaSocios = [...socios.socios];

    const index = novaListaSocios.findIndex((socio) => socio.id === socioId);

    if (index !== -1) {
      // Atualize o nome do sócio na cópia do estado moreInformations
      novaListaSocios[index].nome = novoNome;

      setSocios((prevState) => ({
        ...prevState,
        socios: novaListaSocios,
      }));
    }
  };
  //Atualizar
  useEffect(() => {
    if (submit) {
      const socioData = {
        ...socios,
      };

      try {
        API_URL.patch("/atualizar-socio", socioData).catch((error) => {
          console.error("Erro na solicitação PATCH:", error);
        });
      } catch (error) {
        console.error("Erro ao atualizar sócio:", error);
      }
    }
  }, [submit, socios]);

  // Criar
  useEffect(() => {
    if (submit) {
      const socioData = {
        pessoaJuridicaId: socios.id,
        sociosData: novosSocios,
      };

      try {
        API_URL.post("/cadastrar-socio", socioData).catch((error) => {
          console.error("Erro na solicitação PATCH:", error);
        });
      } catch (error) {
        console.error("Erro ao atualizar sócio:", error);
      }
    }
  }, [submit, socios]);

  const handleRemoveSocio = async (socioId) => {
    try {
      await API_URL.delete("/deletar-socio", {
        data: { socioId },
      });

      toast.success("Sócio removido com sucesso");

      const novaListaSocios = sociosEditados.filter(
        (socio) => socio.id !== socioId
      );
      setSociosEditados(novaListaSocios);
    } catch (error) {
      console.error("Erro ao remover sócio:", error);
      toast.error("Erro ao remover sócio:", error);
    }
  };

  const handleAdicionarSocio = () => {
    const novoSocio = { nome: "" };
    setNovosSocios([...novosSocios, novoSocio]);
    console.log(novoSocio);
  };

  function corrigirData(data) {
    if (!data) return "";
    const dataLocal = new Date(data);
    dataLocal.setDate(dataLocal.getDate() + 1);

    // Formata a data para o formato "AAAA-MM-DD"
    const anoCorrigido = dataLocal.getFullYear();
    const mesCorrigido = String(dataLocal.getMonth()).padStart(2, "0");
    const diaCorrigido = String(dataLocal.getDate() + 1).padStart(2, "0");

    return `${diaCorrigido}-${mesCorrigido}-${anoCorrigido}`;
  }

  const dataAberturaEmpresaField = isEditing ? (
    <Input
      type="date"
      value={moreData?.dataAberturaEmpresa}
      onChange={(e) =>
        handleMoreInformations("dataAberturaEmpresa", e.target.value)
      }
      inputProps={{ style: { textAlign: "center" } }}
    />
  ) : (
    <Input
      value={corrigirData(moreData?.dataAberturaEmpresa)}
      disabled={!isEditing}
      inputProps={{ locale: "pt-BR" }}
    />
  );

  return (
    <ColumnContainer>
      <strong>Data de Abertura da Empresa:</strong>
      {dataAberturaEmpresaField}

      <strong>Sócios Administradores:</strong>
      {socios?.socios?.map((socio) => (
        <div key={socio.id}>
          <Input
            value={socio.nome}
            disabled={!isEditing}
            onChange={
              (e) => handleSocioNomeChange(socio.id, e.target.value) // Passe o ID e o novo nome
            }
          />

          {isEditing && (
            <IconButton
              onClick={() => handleRemoveSocio(socio.id)}
              aria-label="Remover sócio"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}

      {novosSocios.map((novoSocio, index) => (
        <div key={index}>
          <Input
            placeholder="Novo Sócio"
            value={novoSocio.nome}
            onChange={(e) => {
              const novosSociosAtualizados = [...novosSocios];
              novosSociosAtualizados[index].nome = e.target.value;
              setNovosSocios(novosSociosAtualizados);
            }}
          />
        </div>
      ))}
      {isEditing && (
        <IconButton onClick={handleAdicionarSocio} aria-label="Adicionar sócio">
          <AddIcon />
        </IconButton>
      )}
    </ColumnContainer>
  );
};

export default MoreInformations;
