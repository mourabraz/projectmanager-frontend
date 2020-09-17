/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { Colors } from '../../../../styles/colors';

interface IListProps {
  done?: boolean;
}

interface IContentProps {
  isDragging: boolean;
}

export const Container = styled.div<IListProps>`
  padding: 0;
  min-height: 100%;
  flex: 0 0 312px;
  opacity: ${(props) => (props.done ? 0.6 : 1)};

  & + div {
    margin-left: 4px;
    padding-left: 4px;
    border-left: 1px solid ${Colors.warnDark};
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 1.6rem;
      padding: 0 10px;
    }

    button {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: ${Colors.info};
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 16px;

      cursor: pointer;

      &:hover {
        background: ${Colors.infoDark};
      }
    }
  }
`;

export const Content = styled.div.attrs<IContentProps>((props) => ({
  style: {
    background: `${props.isDragging ? Colors.warnLight : 'transparent'}`,
  },
}))<IContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 16px;
  padding: 0;
  border-radius: 8px;
  transition: background-color 0.3s ease;
`;
