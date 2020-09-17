import styled from 'styled-components';
import Tooltip from '../Tooltip';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  border: 4px dashed ${Colors.infoLight};
  border-radius: 50%;

  img {
    object-fit: cover;
    width: 150px;
    height: 150px;

    border-radius: 50%;
  }

  input[type='file'] {
    height: 150px;
    width: 150px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  width: 20px;
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
