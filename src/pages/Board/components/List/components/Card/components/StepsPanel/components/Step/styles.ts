import styled from 'styled-components';
import { Colors } from '../../../../../../../../../../styles/colors';

interface IContainerProps {
  isDragging: boolean;
}

interface IStepTitleProps {
  isCompleted: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: ${(props) =>
    props.isDragging ? Colors.primaryDark : Colors.primary};
  padding: 4px 2px;

  display: flex;
  justify-items: start;
  align-items: center;
`;

export const CheckBoxButton = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 0;
  flex-shrink: 0;

  margin-right: 8px;
`;

export const StepTitle = styled.p<IStepTitleProps>`
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  flex-grow: 1;
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
