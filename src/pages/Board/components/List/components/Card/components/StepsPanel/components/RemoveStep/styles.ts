import styled from 'styled-components';
import { Colors } from '../../../../../../../../../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
      font-size: 2.4rem;
      font-weight: 500;
      margin-top: 32px;
    }

    hr {
      margin-top: 32px;
      margin-bottom: 16px;
      width: 100%;
      height: 1px;
      background: ${Colors.defaultLight};
    }
  }
`;

export const Content = styled.div`
  > button {
    margin-top: 16px;

    svg {
      margin-left: 16px;
    }
  }
`;
