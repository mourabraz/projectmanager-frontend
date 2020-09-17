import React, { useEffect, useCallback, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ITask } from '../../interfaces';

import { ProjectsProvider, useProjects } from '../../hooks/projects';
import { TasksProvider, useTasks } from '../../hooks/tasks';

import PageLoading from '../../components/PageLoading';
import Modal from '../../components/Modal';
import Header from './components/Header';
import List from './components/List';
import RemoveTask from './components/RemoveTask';

import { Container } from './styles';

const Board: React.FC = () => {
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [showDeleteTaskModalFor, setShowDeleteTaskModalFor] = useState<
    ITask | undefined
  >(undefined);

  const { selectedProject } = useProjects();
  const {
    fetchTasks,
    tasks,
    reorderTask,
    moveTask,
    setAllCardsShouldBeClosed,
  } = useTasks();

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      setTasksLoading(true);
      await fetchTasks(selectedProject.id);
      setTasksLoading(false);
    }

    if (selectedProject.id) {
      loadTasks();
    }
  }, [fetchTasks, selectedProject.id]);

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      const { source, destination } = result;

      setAllCardsShouldBeClosed(false);

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        reorderTask(source, source.index, destination.index);
      } else {
        moveTask(source, destination);
      }
    },
    [moveTask, reorderTask, setAllCardsShouldBeClosed],
  );

  const onBeforeCapture = useCallback(() => {
    setAllCardsShouldBeClosed(true);
  }, [setAllCardsShouldBeClosed]);

  return (
    <>
      <PageLoading visible={tasksLoading}>
        <p>
          <i>Loading all tasks for the selected project</i>
        </p>
      </PageLoading>
      <Modal visible={!!showDeleteTaskModalFor}>
        {showDeleteTaskModalFor && (
          <RemoveTask
            task={showDeleteTaskModalFor}
            onClose={(): void => setShowDeleteTaskModalFor(undefined)}
          />
        )}
      </Modal>
      <Container>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeCapture={onBeforeCapture}
        >
          {tasks.map((list) => (
            <List
              key={list.id}
              data={list}
              onShowRemoveTaskModal={setShowDeleteTaskModalFor}
            />
          ))}
        </DragDropContext>
      </Container>
    </>
  );
};

const ContainerBoard: React.FC = () => {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <Header />

        <Board />
      </TasksProvider>
    </ProjectsProvider>
  );
};

export default ContainerBoard;
