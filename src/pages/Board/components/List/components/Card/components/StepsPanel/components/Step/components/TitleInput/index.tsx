import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { IStep } from '../../../../../../../../../../../../interfaces';
import { useSteps } from '../../../../../../../../../../../../hooks/steps';

import { Container } from './styles';

interface ITitleInputProps {
  step: IStep;
  onClose: () => void;
}

const TitleInput: React.FC<ITitleInputProps> = ({ step, onClose }) => {
  const [title, setTitle] = useState<string>(step.title);

  const { updateStep } = useSteps();

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 13) {
        if (title !== step.title) {
          try {
            await updateStep({ id: step.id, title });
          } catch (error) {
            toast.error(
              'Oops... Something goes wrong. Unable to update Step title.',
            );
          }
        }

        onClose();
      }
    },
    [onClose, step.id, step.title, title, updateStep],
  );

  return (
    <Container>
      <input
        type="text"
        value={title}
        onKeyDown={onKeyDown}
        onChange={(e): void => setTitle(e.target.value)}
      />
    </Container>
  );
};

export default TitleInput;
