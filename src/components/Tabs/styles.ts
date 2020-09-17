import styled, { css, keyframes } from 'styled-components';
import { Colors } from '../../styles/colors';

interface IAtiveTab {
  isActive: boolean;
}

const appearFromLeft = keyframes`
    from {
      opacity: 0;
      transform: translateX(-150px);
    }
    to {
      opacity: 1;
      transform: translateX(0)
    }
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  border: 1px solid ${Colors.infoLight};
  border-radius: 16px;
`;

export const TabContainer = styled.div`
  display: flex;
`;

export const PanelsContainer = styled.div`
  border-radius: 0 0 16px 16px;
  padding: 16px;
`;

export const PanelContainer = styled.div<IAtiveTab>`
  ${(props) =>
    props.isActive &&
    css`
      animation: ${appearFromLeft} 1s;
    `}
`;

export const ButtonTab = styled.button<IAtiveTab>`
  background: transparent;
  height: 56px;
  border-radius: 16px 16px 0 0;
  border: 0;
  padding: 0 16px;
  color: ${(props) => (props.isActive ? Colors.text : Colors.textLight)};
  width: 100%;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${Colors.text};
  }

  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 4px solid ${Colors.info};
    `}

  ${(props) =>
    !props.isActive &&
    css`
      color: ${Colors.textLight};
    `}
`;
