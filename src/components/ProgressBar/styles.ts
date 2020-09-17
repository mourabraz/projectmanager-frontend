import styled from 'styled-components';
import { Colors } from '../../styles/colors';

interface IContainerProps {
  borderColor: string;
  color: string;
  sizeH: number;
}

interface IContentProps {
  color: string;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  height: ${(props) => `${props.sizeH}px`};
  width: 100%;
  border-radius: ${(props) => `${props.sizeH}px`};
  border: 1px solid ${(props) => props.borderColor};

  span {
    width: 30px;
    height: 30px;
    background: ${(props) => props.color};
    border-radius: 15px;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    color: ${Colors.primary};

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

export const Content = styled.div<IContentProps>`
  background: ${(props) => props.color};
  height: 100%;
  border-radius: inherit;
  transition: width 300ms ease-in;
`;
