import styled, { css } from 'styled-components';
import { DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { Colors } from '../../../../../../styles/colors';

interface IContainerProps {
  isDragging: boolean;
  dragProps: DraggableProvidedDraggableProps;
  isOpen: boolean;
  sizeH: number;
}

interface IDescriptionProps {
  isCompleted: boolean;
}

interface IContentProps {
  isOpen: boolean;
}

interface IDeadlineBadgedProps {
  colorNumber: -1 | 0 | 1;
}

export const Container = styled.div.attrs<IContainerProps>((props) => ({
  style: {
    ...props.dragProps.style,
    background: `${
      props.isDragging ? Colors.primaryDark : Colors.primaryLight
    }`,
  },
}))<IContainerProps>`
  position: relative;
  user-select: none;
  height: 74px;
  width: 290px;
  color: ${Colors.text};
  border-radius: 8px;
  border: 1px solid ${Colors.warn};
  padding: 16px;
  margin: 0 0 8px 0;
  overflow: hidden;

  transition: height 500ms;
  ${(props) =>
    props.isOpen &&
    css`
      height: ${props.sizeH + 90}px;
    `}
`;

export const DeadLineBadged = styled.div<IDeadlineBadgedProps>`
  width: 20px;
  padding: 4px;
  border-radius: 10px;
  background: ${(props) =>
    [Colors.success, Colors.warn, Colors.error][props.colorNumber + 1]};
  position: absolute;
  top: 8px;
  left: 8px;
`;

export const Header = styled.div`
  display: flex;
  background: transparent;
  align-items: center;
  justify-content: space-between;
`;

export const Handle = styled.span`
  width: 40px;
  height: 40px;
  margin-right: 4px;
  border-radius: 20px;
  background: ${Colors.warn};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  text-align: left;
  font-size: 1.6rem;
  font-weight: 500;
  width: calc(256px - 40px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ButtonsOnHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  button {
    border: 0;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    background: ${Colors.default};
    display: flex;
    justify-content: center;
    align-items: center;

    & + button {
      margin-left: 8px;
    }

    &:hover {
      background: ${Colors.defaultDark};
    }

    &:disabled {
      background: ${Colors.defaultLight};
      cursor: not-allowed;

      &:hover {
        background: ${Colors.defaultLight};
      }
    }
  }
`;

export const Content = styled.div<IContentProps>`
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  transition: opacity 500ms;
`;

export const TitleOnContent = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 0;
  flex-shrink: 0;

  margin-left: 4px;
`;

export const CompletedAt = styled.span`
  margin-top: 8px;
  width: 100%;
  display: block;
  text-align: center;
  color: #666;
  padding: 8px;
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StartedAt = styled.span`
  margin-top: 8px;
  width: 100%;
  display: block;
  text-align: center;
  color: #666;
  padding: 8px;
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DeadlineAt = styled.span`
  margin-top: 8px;
  width: 100%;
  display: block;
  text-align: center;
  color: #666;
  padding: 8px;
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Description = styled.div<IDescriptionProps>`
  font-size: 1.2rem;
  line-height: 1.4;
  margin-top: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px dashed #ccc;
  border-radius: 8px;

  > span {
    font-size: 1.2rem;
    font-style: italic;
    color: #ccc;
  }

  code {
    word-break: break-all;
  }

  ul {
    list-style: disc;
    margin-left: 16px;
  }

  ol {
    margin-left: 16px;
  }

  blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
  }
`;

export const StepsList = styled.div``;
