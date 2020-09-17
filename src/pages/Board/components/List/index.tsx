import React, { useState, useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';

import { IListTask, ITask } from '../../../../interfaces';

import Modal from '../../../../components/Modal';
import Card from './components/Card';

import { Container, Content } from './styles';
import CreateTask from './components/CreateTask';

interface IListProps {
  data: IListTask;
  onShowRemoveTaskModal: (task: ITask) => void;
}

const List: React.FC<IListProps> = ({ data, onShowRemoveTaskModal }) => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const handleCreateTask = useCallback(() => {
    setShowCreateTaskModal(true);
  }, []);

  return (
    <>
      {data.creatable && (
        <Modal visible={showCreateTaskModal}>
          <CreateTask onClose={(): void => setShowCreateTaskModal(false)} />
        </Modal>
      )}

      <Container done={data.id === 'TASKS_DONE'}>
        <header>
          <h2>{data.title}</h2>
          {data.creatable && (
            <button type="button" onClick={handleCreateTask}>
              <FiPlus size={20} color="#fff" />
            </button>
          )}
        </header>

        <Droppable droppableId={data.id}>
          {(provided, snapshot): React.ReactElement<HTMLElement> => (
            <Content
              ref={provided.innerRef}
              isDragging={snapshot.isDraggingOver}
            >
              {data.cards.map((item: ITask, index: number) => (
                <Card
                  key={item.id}
                  data={item}
                  index={index}
                  onShowRemoveTaskModal={onShowRemoveTaskModal}
                />
              ))}
              {provided.placeholder}
            </Content>
          )}
        </Droppable>
      </Container>
    </>
  );
};

export default List;
