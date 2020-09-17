import styled from 'styled-components';
import { Colors } from '../../../../../../../../../../styles/colors';

export const Container = styled.div`
  width: 74.66px;
  height: 74.66px;
  background: green;
  margin-top: 8px;

  &:nth-child(3n + 1) {
    margin-right: 8px;
    background: pink;
  }
  &:nth-child(3n + 2) {
    margin-right: 8px;
    background: orange;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-top: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: yellow;
  width: 74.66px;
  height: 74.66px;

  img {
    border: 1px solid ${Colors.default};
    border-radius: 4px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
