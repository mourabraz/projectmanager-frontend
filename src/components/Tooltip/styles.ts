import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: ${Colors.warn};
    padding: 8px;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: ${Colors.text};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${Colors.warn} transparent;
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
