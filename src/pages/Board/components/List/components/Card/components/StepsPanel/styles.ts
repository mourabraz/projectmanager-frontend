import styled from 'styled-components';
import { Colors } from '../../../../../../../../styles/colors';

export const Container = styled.div`
  margin-top: 16px;
  background: ${Colors.primaryLight};
  border-radius: 8px;
  padding: 8px;

  border: 1px dashed ${Colors.infoLight};
`;

export const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;

  > button {
    position: absolute;
    top: -16px;
    left: -16px;
    background: ${Colors.primaryLight};
    border: 1px dashed ${Colors.infoLight};
    border-radius: 50%;
    padding: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: ${Colors.infoLight};

      svg {
        stroke: ${Colors.primary};
      }
    }
  }
`;

export const Progress = styled.div`
  margin: 8px 0;
`;

export const Content = styled.div`
  margin-top: 8px;
`;
