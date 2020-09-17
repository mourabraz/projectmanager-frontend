import styled from 'styled-components';
import { Colors } from '../../styles/colors';

interface ILoadingContainerProps {
  size: number;
  color: string;
}

interface IContentProps {
  padding: number;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.1);

  z-index: 99999;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.section<IContentProps>`
  background: rgba(255, 255, 255, 0.9);
  padding: ${(props) => props.padding}px;
  border: 1px solid ${Colors.textLight};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${Colors.textLight};

  > div {
    margin-top: 32px;
  }
`;

export const LoadingContainer = styled.svg<ILoadingContainerProps>`
  animation: rotate 2s linear infinite;
  margin: 2.5px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  & .path {
    stroke: ${(props) => props.color};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
