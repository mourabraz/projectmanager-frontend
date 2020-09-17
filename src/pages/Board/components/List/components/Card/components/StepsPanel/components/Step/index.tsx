import React, { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiCheckSquare, FiMinusSquare, FiTrash2 } from 'react-icons/fi';

import { IStep } from '../../../../../../../../../../interfaces';
import { useSteps } from '../../../../../../../../../../hooks/steps';

import TitleInput from './components/TitleInput';

import { Colors } from '../../../../../../../../../../styles/colors';
import { Container, StepTitle, CheckBoxButton, RemoveButton } from './styles';

interface IStepProps {
  step: IStep;
  index: number;
  onShowRemoveStepModal: (step: IStep) => void;
}

const Step: React.FC<IStepProps> = ({ step, index, onShowRemoveStepModal }) => {
  const [togglingCompletedAt, setTogglingCompletedAt] = useState<boolean>(
    false,
  );
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const { toggleCompleteStep } = useSteps();

  const toggleCompletedAt = useCallback(async (): Promise<void> => {
    setTogglingCompletedAt(true);

    await toggleCompleteStep(step.id);

    setTogglingCompletedAt(false);
  }, [step.id, toggleCompleteStep]);

  return (
    <Draggable
      draggableId={`Step@${step.id}`}
      index={index}
      isDragDisabled={showTitleInput}
    >
      {(provided, snapshot): React.ReactElement<HTMLElement> => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <CheckBoxButton
            type="button"
            onClick={toggleCompletedAt}
            disabled={togglingCompletedAt}
          >
            {step.completedAt ? (
              <FiCheckSquare color={Colors.successLight} size={14} />
            ) : (
              <FiMinusSquare color={Colors.errorLight} size={14} />
            )}
          </CheckBoxButton>

          {showTitleInput ? (
            <TitleInput
              step={step}
              onClose={(): void => {
                setShowTitleInput(false);
              }}
            />
          ) : (
            <StepTitle
              isCompleted={!!step.completedAt}
              onDoubleClick={(): void => setShowTitleInput(true)}
            >
              {step.title}
            </StepTitle>
          )}

          <RemoveButton
            type="button"
            onClick={(): void => onShowRemoveStepModal(step)}
          >
            <FiTrash2 color={Colors.error} size={12} />
          </RemoveButton>
        </Container>
      )}
    </Draggable>
  );
};

export default Step;
