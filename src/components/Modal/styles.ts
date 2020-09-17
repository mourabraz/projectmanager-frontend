import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
`;

export const Content = styled.section`
  position: relative;
  background: ${Colors.primary};
  padding: 20px;
  border: 1px solid ${Colors.textLight};
  border-radius: 4px;
  width: 80%;
  max-width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;

  color: ${Colors.text};
`;
