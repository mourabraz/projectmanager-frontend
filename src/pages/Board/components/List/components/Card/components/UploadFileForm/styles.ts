import styled from 'styled-components';
import { Colors } from '../../../../../../../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;

    p {
      font-size: 2.4rem;
      font-weight: 500;
    }

    > button {
      padding: 4px;
      background: ${Colors.error};
      border-radius: 4px;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    > div {
      background: ${Colors.primary};

      textarea {
        color: ${Colors.text};
      }
    }

    > button {
      margin-top: 16px;

      max-width: 350px;

      svg {
        margin-left: 16px;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  hr {
    height: 2px;
    width: 100%;
    margin: 16px 0;
    background: ${Colors.default};
  }

  > button {
    max-width: 150px;
  }
`;
