import styled from "styled-components";

export const DashboarDiv = styled.div`
  width: 100%;
  background-color: #06064b;
  color: white;
  margin: 0;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  align-items: center;
  font-size: 1.2rem;
  z-index: 2;
  position: relative;
  .resetH1 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%; 
  margin-top: 2rem;
`;


export const ColumnContainer = styled.div`
 display: flex;
  flex-direction: column;
`