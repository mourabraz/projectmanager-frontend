import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { FiXCircle } from 'react-icons/fi';

import { IStep } from '../../../../../../../../../../interfaces';

import { useSteps } from '../../../../../../../../../../hooks/steps';
import Button from '../../../../../../../../../../components/Button';

import { Colors } from '../../../../../../../../../../styles/colors';
import { Container, Content } from './styles';
import Loading from '../../../../../../../../../../components/Loading';

interface IRemoveStepProps {
  step: IStep;
  onClose: () => void;
}

const RemoveStep: React.FC<IRemoveStepProps> = ({ step, onClose }) => {
  const [removing, setRemoving] = useState<boolean>(false);

  const { removeStep } = useSteps();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleRemoveStep = useCallback(async () => {
    try {
      setRemoving(true);

      await removeStep(step.id);

      handleCloseButton();
    } catch (error) {
      setRemoving(false);

      toast.error(
        'Opps! Something goes wrong... It could not remove the step.',
      );
    }
  }, [handleCloseButton, removeStep, step.id]);

  return (
    <Container>
      <header>
        <FiXCircle color={Colors.error} size={50} />
        <h2>Are you sure? Do you really want to remove this step?</h2>

        <hr />

        <p>{`${step.title}`}</p>
      </header>

      <Content>
        {removing && <Loading color={Colors.primary} />}
        <Button
          type="button"
          kind="info"
          disabled={removing}
          onClick={handleRemoveStep}
        >
          Delete
        </Button>
        <Button
          type="button"
          kind="default"
          disabled={removing}
          onClick={handleCloseButton}
        >
          Cancel
        </Button>
      </Content>
    </Container>
  );
};

export default RemoveStep;
