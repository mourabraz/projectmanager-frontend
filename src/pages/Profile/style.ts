import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  margin: 16px;
  background: ${Colors.primaryLight};
  padding: 32px;

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  height: calc(100vh - 104px);
`;

export const Content = styled.div`
  max-width: 500px;
  margin: 0 auto;

  form {
    button {
      margin-top: 16px;
    }
  }
`;

export const AlertaDanger = styled.div`
  width: 750px;
  padding: 32px;
  margin: 32px auto;
  border: 1px solid ${Colors.errorDark};
  border-radius: 8px;

  color: ${Colors.errorDark};

  p {
    text-align: center;
  }
`;
