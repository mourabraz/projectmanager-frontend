import React, { createContext, useCallback, useState, useContext } from 'react';
import produce from 'immer';
// eslint-disable-next-line import/no-duplicates
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
// eslint-disable-next-line import/no-duplicates
import pt from 'date-fns/locale/pt';

import { IStep } from '../interfaces';

import api from '../services/api';

interface IStepsContextData {
  steps: IStep[];
  fetchSteps(projectId: string): Promise<void>;
  reorderStep(
    // droppableSource: { index: number; droppableId: string },
    startIndex: number,
    endIndex: number,
  ): Promise<void>;
  storeStep(data: {
    taskId: string;
    title: string;
    description?: string;
  }): Promise<void>;
  removeStep(stepId: string): Promise<void>;
  updateStep(data: {
    id: string;
    title: string;
    description?: string;
  }): Promise<void>;
  toggleCompleteStep(stepId: string): Promise<void>;
  errorStep: string | undefined;
}

const StepsContext = createContext<IStepsContextData>({} as IStepsContextData);

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const StepsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IStep[]>([]);
  const [error, setError] = useState<string | undefined>();

  const fetchSteps = useCallback(async (taskId) => {
    setError(undefined);

    try {
      const response = await api.get(`tasks/${taskId}/steps`);

      const steps: IStep[] = response.data.map((item: IStep) => ({
        ...item,
        completedAt: item.completedAt
          ? format(
              utcToZonedTime(parseISO(item.completedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' hh:mm",
              { locale: pt },
            )
          : null,
      }));

      setData(steps);
    } catch (err) {
      setError(err);
    }
  }, []);

  const reorderStep = useCallback(
    async (
      // droppableSource: { index: number; droppableId: string },
      startIndex: number,
      endIndex: number,
    ) => {
      const original = Array.from(data);
      const orderStep = original[startIndex];

      setData((state) => {
        return produce(state, (draft) => {
          const [removed] = draft.splice(startIndex, 1);
          draft.splice(endIndex, 0, removed);

          // eslint-disable-next-line no-param-reassign
          draft = draft.map((item, _index) => ({
            ...item,
            order: _index + 1,
          }));
        });
      });

      try {
        await api.patch(`steps/${orderStep.id}/order/${endIndex}`);
      } catch (err) {
        setData(original);

        throw new Error('Internal error: reorderStep on useSteps');
      }
    },
    [data],
  );

  const storeStep = useCallback(async ({ taskId, title, description = '' }) => {
    try {
      const response = await api.post(`tasks/${taskId}/steps`, {
        title,
        description,
      });

      const step: IStep = {
        ...response.data,
        completedAt: response.data.completedAt
          ? format(
              utcToZonedTime(parseISO(response.data.completedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' hh:mm",
              { locale: pt },
            )
          : null,
      };

      setData((state) => {
        return produce(state, (draft) => {
          draft.push(step);
        });
      });
    } catch (err) {
      // if (err.response) {
      //   throw new Error(err.response.data.error);
      // }

      // if (err.request) {
      //   throw new Error(err.request);
      // }

      throw new Error('Internal error: storeSteps on useSteps');
    }
  }, []);

  const removeStep = useCallback(
    async (id: string) => {
      try {
        await api.delete(`steps/${id}`);
        const index = data.findIndex((s) => s.id === id);

        setData((state) => {
          return produce(state, (draft) => {
            // eslint-disable-next-line no-param-reassign
            draft = draft.splice(index, 1).map((item, _index) => ({
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

        throw new Error('Internal error: removeStep on useSteps');
      }
    },
    [data],
  );

  const updateStep = useCallback(async ({ id, title, description = '' }) => {
    try {
      const response = await api.put(`steps/${id}`, {
        title,
        description,
      });

      const step: IStep = {
        ...response.data,
        completedAt: response.data.completedAt
          ? format(
              utcToZonedTime(parseISO(response.data.completedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' hh:mm",
              { locale: pt },
            )
          : null,
      };

      setData((state) => {
        return produce(state, (draft) => {
          const index = draft.findIndex((t) => t.id === step.id);

          if (index > -1) {
            draft[index] = step;
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

      throw new Error('Internal error: updateStep on useSteps');
    }
  }, []);

  const toggleCompleteStep = useCallback(async (stepId) => {
    try {
      const response = await api.patch(`steps/${stepId}/completed`);

      const step: IStep = {
        ...response.data,
        completedAt: response.data.completedAt
          ? format(
              utcToZonedTime(parseISO(response.data.completedAt), timezone),
              "d ' de ' MMMM ' de ' yyyy ' às ' hh:mm",
              { locale: pt },
            )
          : null,
      };

      setData((state) => {
        return produce(state, (draft) => {
          const index = draft.findIndex((t) => t.id === step.id);

          if (index > -1) {
            draft[index] = step;
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

      throw new Error('Internal error: toggleCompleteStep on useSteps');
    }
  }, []);

  return (
    <StepsContext.Provider
      value={{
        steps: data,
        fetchSteps,
        reorderStep,
        storeStep,
        removeStep,
        updateStep,
        toggleCompleteStep,
        errorStep: error,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

function useSteps(): IStepsContextData {
  const context = useContext(StepsContext);

  if (!context) {
    throw new Error('useSteps must be within an StepsProvider');
  }

  return context;
}

export { StepsProvider, useSteps };
