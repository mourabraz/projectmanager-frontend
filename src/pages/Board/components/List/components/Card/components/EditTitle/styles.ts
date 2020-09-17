import styled from 'styled-components';
import { Colors } from '../../../../../../../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    p {
      font-size: 2.4rem;
      font-weight: 500;
    }

    button {
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
  form {
    > div {
      background: ${Colors.primary};

      input {
        color: ${Colors.text};
      }
    }

    > button {
      margin-top: 16px;

      svg {
        margin-left: 16px;
      }
    }
  }
`;
