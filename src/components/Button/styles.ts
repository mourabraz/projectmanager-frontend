import styled from 'styled-components';
import { Colors } from '../../styles/colors';

interface ButtonProps {
  kind: 'success' | 'info' | 'warn' | 'error' | 'default';
}

export const Container = styled.button<ButtonProps>`
  position: relative;
  background: ${(props) => Colors[props.kind]};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${Colors.primary};
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background: ${(props) =>
      Colors[`${props.kind}Light` as keyof typeof Colors]};
    cursor: not-allowed;

    &:hover {
      background: ${(props) =>
        Colors[`${props.kind}Light` as keyof typeof Colors]};
    }
  }

  &:hover {
    background: ${(props) =>
      Colors[`${props.kind}Dark` as keyof typeof Colors]};
  }

  span {
    width: max-content;
    background: ${Colors.primaryLight};
    padding: 16px;
    border: 1px solid ${Colors.default};
    border-radius: 4px;
    font-size: 1.4rem;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    color: ${Colors.text};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${Colors.default} transparent;
      border-width: 6px 6px 0 6px;
      /* bottom: 20px; */
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
