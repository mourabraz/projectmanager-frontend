import React, { createContext, useCallback, useState, useContext } from 'react';
import produce from 'immer';
// eslint-disable-next-line import/no-duplicates
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
// eslint-disable-next-line import/no-duplicates
import pt from 'date-fns/locale/pt';

import { IListTask, ITask, IFiile } from '../interfaces';

import api from '../services/api';

interface ITasksContextData {
  tasks: IListTask[];
  fetchTasks(projectId: string): Promise<void>;
  moveTask(
    droppableSource: { index: number; droppableId: string },
    droppableDestination: { index: number; droppableId: string },
  ): Promise<void>;
  reorderTask(
    droppableSource: { index: number; droppableId: string },
    startIndex: number,
    endIndex: number,
  ): Promise<void>;
  storeTask(data: {
    projectId: string;
    title: string;
    description: string;
    deadlineAt: Date | null;
    startedAt: Date | null;
  }): Promise<void>;
  removeTask(task: ITask): Promise<void>;
  updateTask(data: {
    task: ITask;
    title?: string;
    description?: string;
    deadlineAt?: Date | null | 'null';
    startedAt?: Date | null | 'null';
  }): Promise<void>;
  addFileToTask(data: { task: ITask; fiile: IFiile }): void;
  allCardsShouldBeClosed: boolean;
  setAllCardsShouldBeClosed(flag: boolean): void;
}

const TasksContext = createContext<ITasksContextData>({} as ITasksContextData);

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const TasksProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IListTask[]>([]);
  const [allCardsClosed, setAllCardsClosed] = useState<boolean>(false);

  const fetchTasks = useCallback(async (projectId) => {
    try {
      const response = await api.get(`projects/${projectId}/tasks`);

      const tasks: ITask[] = response.data.map((item: ITask) => ({
        ...item,
        formatedCompletedAt: item.completedAt
          ? format(
              utcToZonedTime(parseISO(item.completedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
              { locale: pt },
            )
          : undefined,
        formatedDeadlineAt: item.deadlineAt
          ? format(
              utcToZonedTime(parseISO(item.deadlineAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
              { locale: pt },
            )
          : undefined,
        formatedStartedAt: item.startedAt
          ? format(
              utcToZonedTime(parseISO(item.startedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
              { locale: pt },
            )
          : undefined,
      }));

      const temp: IListTask[] = [
        {
          id: 'TASKS_OPEN',
          title: 'Open',
          creatable: true,
          cards: tasks.filter((t) => t.status === 'OPEN'),
        },
        {
          id: 'TASKS_IN_PROGRESS',
          title: 'In Progress',
          creatable: false,
          cards: tasks.filter((t) => t.status === 'IN_PROGRESS'),
        },
        {
          id: 'TASKS_ABANDONED',
          title: 'Paused',
          creatable: false,
          cards: tasks.filter((t) => t.status === 'ABANDONED'),
        },
        {
          id: 'TASKS_DONE',
          title: 'Done',
          creatable: false,
          cards: tasks.filter((t) => t.status === 'DONE'),
        },
      ];

      setData(temp);
    } catch (err) {
      // if (err.response) {
      //   throw new Error(err.response.data.error);
      // }

      // if (err.request) {
      //   throw new Error(err.request);
      // }

      throw new Error('Internal error: fetchTasks on useTasks');
    }
  }, []);

  const reorderTask = useCallback(
    async (
      droppableSource: { index: number; droppableId: string },
      startIndex: number,
      endIndex: number,
    ) => {
      const original = Array.from(data);
      const index = data.findIndex((l) => l.id === droppableSource.droppableId);
      const orderTask = data[index].cards[startIndex];

      setData((state) => {
        return produce(state, (draft) => {
          const [removed] = draft[index].cards.splice(startIndex, 1);
          draft[index].cards.splice(endIndex, 0, removed);

          // eslint-disable-next-line no-param-reassign
          draft[index].cards = draft[index].cards.map((item, _index) => ({
            ...item,
            order: _index + 1,
          }));
        });
      });

      try {
        const { data: resData } = await api.put(
          `tasks/${orderTask.id}/statusorder`,
          {
            status: orderTask.status,
            order: endIndex + 1,
          },
        );

        setData((state) => {
          return produce(state, (draft) => {
            const taskIndex = draft[index].cards.findIndex(
              (t) => t.id === resData.id,
            );

            if (taskIndex > -1) {
              draft[index].cards[taskIndex] = {
                ...resData,
                formatedCompletedAt: resData.completedAt
                  ? format(
                      utcToZonedTime(parseISO(resData.completedAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedDeadlineAt: resData.deadlineAt
                  ? format(
                      utcToZonedTime(parseISO(resData.deadlineAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedStartedAt: resData.startedAt
                  ? format(
                      utcToZonedTime(parseISO(resData.startedAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
              };
            }
          });
        });
      } catch (err) {
        setData(original);
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: reorderTask on useTasks');
      }
    },
    [data],
  );

  const moveTask = useCallback(
    async (
      droppableSource: { index: number; droppableId: string },
      droppableDestination: { index: number; droppableId: string },
    ) => {
      const original = Array.from(data);

      const indexSource = data.findIndex(
        (l) => l.id === droppableSource.droppableId,
      );
      const indexDestination = data.findIndex(
        (l) => l.id === droppableDestination.droppableId,
      );

      const updateTask = data[indexSource].cards[droppableSource.index];
      const status = data[indexDestination].id.replace('TASKS_', '');

      setData((state) => {
        return produce(state, (draft) => {
          const sourceClone = draft[indexSource].cards;
          const destClone = draft[indexDestination].cards;
          const [removed] = sourceClone.splice(droppableSource.index, 1);

          destClone.splice(droppableDestination.index, 0, removed);

          // eslint-disable-next-line no-param-reassign
          draft[indexSource].cards = sourceClone.map((item, _index) => ({
            ...item,
            order: _index + 1,
          }));
          // eslint-disable-next-line no-param-reassign
          draft[indexDestination].cards = destClone.map((item, _index) => ({
            ...item,
            order: _index + 1,
          }));
        });
      });

      try {
        const { data: resData } = await api.put(
          `tasks/${updateTask.id}/statusorder`,
          {
            status,
            order: droppableDestination.index + 1,
          },
        );
        setData((state) => {
          return produce(state, (draft) => {
            const taskIndex = draft[indexDestination].cards.findIndex(
              (t) => t.id === resData.id,
            );

            if (taskIndex > -1) {
              draft[indexDestination].cards[taskIndex] = {
                ...resData,
                formatedCompletedAt: resData.completedAt
                  ? format(
                      utcToZonedTime(parseISO(resData.completedAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedDeadlineAt: resData.deadlineAt
                  ? format(
                      utcToZonedTime(parseISO(resData.deadlineAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedStartedAt: resData.startedAt
                  ? format(
                      utcToZonedTime(parseISO(resData.startedAt), timezone),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
              };
            }
          });
        });
      } catch (err) {
        setData(original);
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: moveTask on useTasks');
      }
    },
    [data],
  );

  const storeTask = useCallback(
    async ({ projectId, title, description, deadlineAt, startedAt }) => {
      try {
        const response = await api.post(`projects/${projectId}/tasks`, {
          title,
          description,
          deadlineAt,
          startedAt,
        });

        const task: ITask = response.data;

        setData((state) => {
          return produce(state, (draft) => {
            const index = draft.findIndex(
              (l) => l.id === `TASKS_${task.status.toUpperCase()}`,
            );
            draft[index].cards.push({
              ...task,
              formatedCompletedAt: task.completedAt
                ? format(
                    utcToZonedTime(parseISO(task.completedAt), timezone),
                    "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                    { locale: pt },
                  )
                : undefined,
              formatedDeadlineAt: task.deadlineAt
                ? format(
                    utcToZonedTime(parseISO(task.deadlineAt), timezone),
                    "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                    { locale: pt },
                  )
                : undefined,
              formatedStartedAt: task.startedAt
                ? format(
                    utcToZonedTime(parseISO(task.startedAt), timezone),
                    "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                    { locale: pt },
                  )
                : undefined,
            });
          });
        });
      } catch (err) {
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: storeTasks on useTasks');
      }
    },
    [],
  );

  const removeTask = useCallback(async (task: ITask) => {
    try {
      await api.delete(`tasks/${task.id}`);

      setData((state) => {
        return produce(state, (draft) => {
          const index = draft.findIndex(
            (l) => l.id === `TASKS_${task.status.toUpperCase()}`,
          );

          const taskIndex = draft[index].cards.findIndex(
            (t) => t.id === task.id,
          );

          draft[index].cards.splice(taskIndex, 1).map((item, _index) => ({
            ...item,
            order: _index + 1,
          }));
        });
      });
    } catch (err) {
      // if (err.response) {
      //   throw new Error(err.response.data.error);
      // }

      // if (err.request) {
      //   throw new Error(err.request);
      // }

      throw new Error('Internal error: removeTask on useTasks');
    }
  }, []);

  const updateTask = useCallback(
    async ({ task, title, description, deadlineAt, startedAt }) => {
      try {
        const formData: {
          title?: string;
          description?: string;
          deadlineAt?: Date | string | null;
          startedAt?: Date | string | null;
        } = {};

        if (title && task.title !== title) {
          formData.title = title;
        }
        if (description && task.description !== description) {
          formData.description = description;
        }
        if (deadlineAt && task.deadlineAt !== deadlineAt) {
          const deadlineAtParsed =
            typeof deadlineAt === 'string' && deadlineAt !== 'null'
              ? parseISO(deadlineAt)
              : deadlineAt;

          formData.deadlineAt = deadlineAtParsed;
        }
        if (startedAt && task.startedAt !== startedAt) {
          const startedAtParsed =
            typeof startedAt === 'string' && startedAt !== 'null'
              ? parseISO(startedAt)
              : startedAt;

          formData.startedAt = startedAtParsed;
        }

        console.log(formData);

        const response = await api.put(`tasks/${task.id}`, formData);

        const taskResponse: ITask = response.data;

        setData((state) => {
          return produce(state, (draft) => {
            const index = draft.findIndex(
              (l) => l.id === `TASKS_${taskResponse.status.toUpperCase()}`,
            );
            const taskResponseIndex = draft[index].cards.findIndex(
              (t) => t.id === taskResponse.id,
            );

            if (taskResponseIndex > -1) {
              draft[index].cards[taskResponseIndex] = {
                ...taskResponse,
                formatedCompletedAt: taskResponse.completedAt
                  ? format(
                      utcToZonedTime(
                        parseISO(taskResponse.completedAt),
                        timezone,
                      ),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedDeadlineAt: taskResponse.deadlineAt
                  ? format(
                      utcToZonedTime(
                        parseISO(taskResponse.deadlineAt),
                        timezone,
                      ),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
                formatedStartedAt: taskResponse.startedAt
                  ? format(
                      utcToZonedTime(
                        parseISO(taskResponse.startedAt),
                        timezone,
                      ),
                      "d ' de ' MMMM ' de ' yyyy ' às ' HH:mm",
                      { locale: pt },
                    )
                  : undefined,
              };
            }
          });
        });
      } catch (err) {
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: updateTask on useTasks');
      }
    },
    [],
  );

  const addFileToTask = useCallback(async ({ task, fiile }) => {
    try {
      setData((state) => {
        return produce(state, (draft) => {
          const index = draft.findIndex(
            (l) => l.id === `TASKS_${task.status.toUpperCase()}`,
          );
          const taskIndex = draft[index].cards.findIndex(
            (t) => t.id === task.id,
          );

          if (taskIndex > -1) {
            if (Array.isArray(draft[index].cards[taskIndex].fiiles)) {
              draft[index].cards[taskIndex].fiiles.push(fiile);
            } else {
              draft[index].cards[taskIndex].fiiles = [fiile];
            }
          }
        });
      });
    } catch (err) {
      throw new Error('Internal error: addFileToTask on useTasks');
    }
  }, []);

  const setAllCardsShouldBeClosed = useCallback((flag) => {
    setAllCardsClosed(flag);
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks: data,
        fetchTasks,
        moveTask,
        reorderTask,
        storeTask,
        removeTask,
        updateTask,
        addFileToTask,
        allCardsShouldBeClosed: allCardsClosed,
        setAllCardsShouldBeClosed,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

function useTasks(): ITasksContextData {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be within an TasksProvider');
  }

  return context;
}

export { TasksProvider, useTasks };
