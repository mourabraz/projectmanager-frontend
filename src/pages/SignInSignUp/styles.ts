import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  height: 100vh;

  padding-top: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  a {
    color: ${Colors.textLight};
    display: inline-block;

    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${Colors.text};
    }
  }
`;

export const Content = styled.div`
  margin-top: 70px;
`;
