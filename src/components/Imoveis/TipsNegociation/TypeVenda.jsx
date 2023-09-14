import React from 'react';
import { FormControl, FormLabel, Input, Checkbox } from '@material-ui/core';
import styled from 'styled-components';
import { useFormularioContext } from '../../../context/CadastroProvider';


const DivContainer = styled.div`
  width: 50%;
  display: flex;
    flex-direction: column;
    align-items: center;
`;
const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

const CenterDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;


export default function TypeVenda() {
  const { dadosFormulario, setDadosFormulario } = useFormularioContext();

  const handleValueChange = (field, value) => {
    setDadosFormulario({
      ...dadosFormulario,
      negociacao: {
        ...dadosFormulario.negociacao,
        valores: {
          ...dadosFormulario.negociacao.valores,
          [field]: value,
        },
      },
    });
  };

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.valorVenda}
            onChange={(e) => handleValueChange('valorVenda', e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação(%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.taxaIntermediacao}
            onChange={(e) => handleValueChange('taxaIntermediacao', e.target.value)}
          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}
