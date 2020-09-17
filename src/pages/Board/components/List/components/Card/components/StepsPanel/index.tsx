import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { ITask, IStep } from '../../../../../../../../interfaces';
import { useSteps } from '../../../../../../../../hooks/steps';

import Modal from '../../../../../../../../components/Modal';
import ProgressBar from '../../../../../../../../components/ProgressBar';
import CreateStep from './components/CreateStep';
import RemoveStep from './components/RemoveStep';
import Step from './components/Step';

import { Colors } from '../../../../../../../../styles/colors';
import { Container, Header, Progress, Content } from './styles';

interface IStepsPanelProps {
  task: ITask;
  onNeedReender: () => void;
}

const StepsPanel: React.FC<IStepsPanelProps> = ({ task, onNeedReender }) => {
  const [showCreateStepModal, setShowCreateStepModal] = useState<boolean>(
    false,
  );
  const [showDeleteStepModalFor, setShowDeleteStepModalFor] = useState<
    IStep | undefined
  >(undefined);

  const [percentage, setPercentage] = useState<number>(0);

  const { steps, fetchSteps, reorderStep } = useSteps();

  useEffect(() => {
    async function load(): Promise<void> {
      await fetchSteps(task.id);
    }

    if (task.id) {
      load();
    }
  }, [fetchSteps, task.id]);

  useEffect(() => {
    let percente = 0;
    if (steps.length !== 0) {
      const completed = steps.filter((s) => s.completedAt);
      percente = Math.round((completed.length * 100) / steps.length);
    }
    setPercentage(percente);
  }, [steps]);

  const createStepFinished = useCallback(() => {
    setShowCreateStepModal(false);
    onNeedReender();
  }, [onNeedReender]);

  const onDragEnd = useCallback(
    async ({ destination, source }: DropResult): Promise<void> => {
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      try {
        await reorderStep(source.index, destination.index);
      } catch (error) {
        toast.error(
          'Ooops! Something goes wrong. Could not reorder the steps.',
        );
      }
    },
    [reorderStep],
  );

  return (
    <>
      <Modal visible={showCreateStepModal}>
        <CreateStep task={task} onClose={createStepFinished} />
      </Modal>
      <Modal visible={!!showDeleteStepModalFor}>
        {showDeleteStepModalFor && (
          <RemoveStep
            step={showDeleteStepModalFor}
            onClose={(): void => setShowDeleteStepModalFor(undefined)}
          />
        )}
      </Modal>
      <Container>
        <Header>
          <button
            type="button"
            onClick={(): void => setShowCreateStepModal(true)}
          >
            <FiPlus color={Colors.textLight} size={12} />
          </button>
        </Header>

        <Progress>
          <ProgressBar
            sizeH={5}
            percentage={percentage}
            color={Colors.infoLight}
            borderColor={Colors.infoLight}
          />
        </Progress>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`task@${task.id}`}>
            {(provided) => (
              <Content ref={provided.innerRef} {...provided.droppableProps}>
                {steps.map((step, index) => (
                  <Step
                    key={step.id}
                    step={step}
                    index={index}
                    onShowRemoveStepModal={setShowDeleteStepModalFor}
                  />
                ))}
                {provided.placeholder}
              </Content>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
};

export default StepsPanel;
