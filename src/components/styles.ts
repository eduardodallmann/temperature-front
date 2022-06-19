import styled from '@emotion/styled';

export const HeaderStyle = styled.div`
  width: calc(100% - 36px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 72px;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-left: 36px;
  position: relative;

  @media (max-width: 600px) {
    padding-left: 16px;
    width: calc(100% - 16px);
    font-size: 20px;
  }

  .menu {
    display: none;
    cursor: pointer;
    margin-right: 26px;

    @media (max-width: 600px) {
      display: flex;
    }
  }
`;

export const LayoutPrincipal = styled.div`
  display: flex;
  min-height: calc(100% - 72px);

  .menu {
    background: #454545;
    width: 65px;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .espaco {
    width: calc(100% - 65px);
    max-width: calc(100% - 109px);
    background-color: #f2f2f2;
    padding: 22px;

    @media (max-width: 600px) {
      max-width: 100%;
      width: 100%;
    }
  }
`;

export const MenuStyle = styled.div`
  .user {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const MenuItem = styled.div`
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 56px;

  :hover {
    background-color: #292929;
  }
`;

export const MenuFullItem = styled.div`
  width: calc(100% - 40px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: 56px;
  padding: 10px 20px;
  border-top: 1px solid #606060;

  .icon {
    margin-right: 20px;
    min-width: 36px;
  }

  .title {
    color: white;
    font-weight: 500;
    font-size: 17px;
  }

  :hover {
    background-color: #292929;
  }
`;

export const PanelStyled = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #ffffff;
  margin-bottom: 13px;

  .title {
    font-weight: 500;
    margin: 13px 11px 0 11px;
    padding: 0 11px 8px 11px;
    font-size: 18px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;

    .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .close {
      cursor: pointer;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .content {
    padding: 16px;
    position: relative;
  }

  .footer {
    margin: 0 11px 13px 11px;
    padding: 8px 11px 0 11px;
    border-top: 1px solid #dddddd;
  }
`;

export const MenuFullStyle = styled.div`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: calc(100% - 72px);
  background-color: #454545;

  @media (min-width: 600px) {
    display: none;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: #63c856;
  border-radius: 4px;
  border: 1px solid #55af49;
  color: #fff;
  padding: 7px 16px;
  font-weight: 700;

  :hover {
    background-color: #55af49;
    border-color: #35832b;
  }
  :active {
    background-color: #35832b;
  }
  :disabled {
    background-color: #b1e3aa;
    border-color: #aad7a4;
    cursor: not-allowed;
  }
`;

export const Bold = styled.span<{weight?: 500 | 700}>`
  font-weight: ${({weight}) => weight || 500};
`;

export const ModalStyled = styled.div`
  height: 100%;
  width: calc(100% - 60%);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30%;
  top: 0;
  left: 0;
`;

export const CheckboxStyled = styled.div`
  display: flex;
  align-items: flex-end;

  input {
    height: 15px;
    width: 15px;
    margin-right: 9px;
  }
`;

export const DescriptionStyled = styled.div<{$error?: boolean}>`
  width: 270px;
  padding: 12px 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-size: 15px;

  .title-d {
    font-size: 18px;
    ${({$error}) => $error && 'color: #FF8181;'}
  }

  .subtitle-d {
    margin-bottom: 20px;
  }
`;

export const EmptyStyled = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #afafaf;

  .title {
    margin-top: 10px;
    color: #858585;
    font-weight: 700;
    font-size: 17px;
  }

  .subtitle {
    margin-top: 10px;
  }
`;
