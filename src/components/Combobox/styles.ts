import styled from 'styled-components';
import { Colors } from '../../styles/colors';

interface IHeaderProps {
  isEmpty: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 360px;
  font-size: 1.4rem;
  user-select: none;

  color: ${Colors.text};
`;

export const Header = styled.button<IHeaderProps>`
  display: flex;
  width: 100%;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  background-color: white;
  cursor: pointer;

  div {
    margin: 0 20px;
    font-style: italic;
  }

  color: ${(props) => (props.isEmpty ? Colors.text : Colors.textLight)};

  &:disabled {
    background-color: rgba(255, 255, 255, 0.8);
    cursor: not-allowed;
  }
`;

export const List = styled.div`
  position: absolute;
  z-index: 10;
  /* overflow-y: scroll; */
  width: 100%;
  max-height: 215px;
  border: 1px solid rgb(223, 223, 223);
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
  background-color: white;
  font-weight: 700;
  text-align: left;
  -webkit-overflow-scrolling: touch;
`;

export const ScrollList = styled.div`
  overflow-y: scroll;
  max-height: 215px;
  padding: 8px 0;
`;

export const ListItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  background: transparent;
  text-align: left;
  overflow: hidden;
  width: 100%;
  padding: 8px 10px;
  font-size: 1.4rem;
  line-height: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.primaryDark};
    color: ${Colors.textLight};
  }
`;
