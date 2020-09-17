import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 250px;
  width: 250px;
  padding: 16px;
`;

export const Content = styled.div`
  position: relative;
  margin-bottom: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  height: 150px;
  width: 150px;

  padding: 8px;

  border: 4px dashed ${Colors.infoLight};
  border-radius: 50%;

  /* img {
    object-fit: cover;
    width: 150px;
    height: 150px;

    border-radius: 50%;
  } */

  input[type='file'] {
    height: inherit;
    width: inherit;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Error = styled.div`
  border: 1px dashed ${Colors.error};
  padding: 16px;

  display: flex;
  justify-content: start;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  p {
    color: ${Colors.error};
  }
`;

export const ProgressBarCancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  > div {
    margin-left: 46px;
    flex-grow: 1;
  }

  button {
    width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 15px;
    background: ${Colors.error};
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 16px;

    cursor: pointer;

    &:hover {
      background: ${Colors.errorDark};
    }
  }
`;
