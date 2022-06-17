import styled from '@emotion/styled';

export const RelatorioFiltroStyled = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 753px) {
    flex-direction: column;
  }

  > div {
    flex: 1;
  }
`;
