import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { FiXCircle } from 'react-icons/fi';

import { ITask } from '../../../../interfaces';

import { useTasks } from '../../../../hooks/tasks';
import Button from '../../../../components/Button';
import Loading from '../../../../components/Loading';

import { Colors } from '../../../../styles/colors';
import { Container, Content } from './styles';

interface IRemoveTaskProps {
  task: ITask;
  onClose: () => void;
}

const RemoveTask: React.FC<IRemoveTaskProps> = ({ task, onClose }) => {
  const [removing, setRemoving] = useState<boolean>(false);

  const { removeTask } = useTasks();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleRemoveTask = useCallback(async () => {
    try {
      setRemoving(true);

      await removeTask(task);

      handleCloseButton();
    } catch (error) {
      setRemoving(false);

      toast.error(
        'Opps! Something goes wrong... It could not remove the task.',
      );
    }
  }, [handleCloseButton, removeTask, task]);

  return (
    <Container>
      <header>
        <FiXCircle color={Colors.error} size={50} />
        <h2>Are you sure? Do you really want to remove this task?</h2>

        <hr />

        <p>{`${task.title}`}</p>
      </header>

      <Content>
        {removing && <Loading color={Colors.primary} />}
        <Button
          type="button"
          kind="info"
          disabled={removing}
          onClick={handleRemoveTask}
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

export default RemoveTask;
