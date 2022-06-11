import styled from '@emotion/styled';
import background from '../../assets/fundo-login.jpg';
import backgroundMobile from '../../assets/fundo-login-mobile.png';

export const LoginStyle = styled.div`
  display: flex;
  height: 100%;

  .img {
    flex: auto;
    background-image: url(${background});
    background-size: cover;
  }

  .login-area {
    padding: 50px 40px;

    @media (min-width: 500px) {
      min-width: 420px;
    }

    @media (max-width: 500px) {
      max-width: 420px;
      background-image: url(${backgroundMobile});
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: bottom;
    }
  }
`;

export const LoginFormStyled = styled.div`
  .title {
    font-size: 22px;
    text-align: center;
    margin-bottom: 55px;
  }

  .subtitle {
    text-align: center;
    margin-bottom: 40px;
  }

  .field {
    margin-bottom: 20px;
  }

  .entrar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: 500px) {
      flex-direction: column;

      .button,
      .button button {
        width: 100%;
      }
    }

    .checkbox {
      margin-bottom: 17px;
    }

    .lembrar-esqueci {
      display: flex;
      flex-direction: column;

      @media (max-width: 500px) {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
    }
  }

  .link {
    color: #3e8fbd;
    cursor: pointer;

    :hover {
      text-decoration-line: underline;
    }
  }
`;
