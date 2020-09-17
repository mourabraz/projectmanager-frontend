import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';
import { Colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${Colors.primaryLight};
  border-radius: 10px;
  border: 2px solid ${Colors.primaryDark};
  padding: 16px;
  width: 100%;
  color: ${Colors.textLight};

  display: flex;
  align-items: center;
  justify-content: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${Colors.error};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${Colors.warnDark};
      border-color: ${Colors.warnDark};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${Colors.warnDark};
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${Colors.text};

    &::placeholder {
      color: ${Colors.textLight};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: ${Colors.error};
    color: #fff;

    &::before {
      border-color: ${Colors.error} transparent;
    }
  }
`;
