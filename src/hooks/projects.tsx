import React, { createContext, useCallback, useState, useContext } from 'react';
import produce from 'immer';

import { IProject } from '../interfaces';

import api from '../services/api';

interface IProjectsContextData {
  projects: IProject[];
  selectedProject: IProject;
  errorProject: string | undefined;
  fetchProjects(): Promise<void>;
  setSelectedProject(project: IProject): void;
  removeProject(project: IProject): Promise<void>;
  archiveProject(project: IProject): Promise<void>;
  storeProject(data: { name: string }): Promise<void>;
  updateProject(data: { id: string; name: string }): Promise<void>;
}

const ProjectsContext = createContext<IProjectsContextData>(
  {} as IProjectsContextData,
);

const ProjectsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IProject[]>([]);
  const [selectedProject, setSelected] = useState<IProject>({} as IProject);
  const [error, setError] = useState<string | undefined>();

  const fetchProjects = useCallback(async () => {
    const response = await api.get<IProject[]>('projects');
    setData(response.data);
  }, []);

  const setSelectedProject = useCallback((project: IProject) => {
    setSelected(project);
  }, []);

  const storeProject = useCallback(async ({ name }) => {
    setError(undefined);

    try {
      const response = await api.post<IProject>('projects', {
        name,
      });

      const project = {
        ...response.data,
      };

      setData((state) => {
        return produce(state, (draft) => {
          draft.push(project);
        });
      });
    } catch (err) {
      setError(err);
    }
  }, []);

  const updateProject = useCallback(
    async ({ id, name }) => {
      try {
        const response = await api.put<IProject>(`projects/${id}`, {
          name,
        });
        const project = { ...response.data };

        if (selectedProject.id === id) {
          const { updatedAt } = project;
          selectedProject.name = name;
          selectedProject.updatedAt = updatedAt;
        }

        setData((state) => {
          return produce(state, (draft) => {
            const index = draft.findIndex((p) => p.id === id);

            draft[index] = { ...draft[index], ...project };

            // eslint-disable-next-line no-param-reassign
            // draft = [...draft];
          });
        });
      } catch (err) {
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: updateProject on useProjects');
      }
    },
    [selectedProject.id, selectedProject.name, selectedProject.updatedAt],
  );

  const removeProject = useCallback(
    async (project: IProject) => {
      try {
        await api.delete(`projects/${project.id}`);

        if (selectedProject.id === project.id) {
          setSelectedProject({} as IProject);
        }

        const index = data.findIndex((s) => s.id === project.id);

        setData((state) => {
          return produce(state, (draft) => {
            // eslint-disable-next-line no-param-reassign
            draft = draft.splice(index, 1);
          });
        });
      } catch (err) {
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: removeProject on useProjects');
      }
    },
    [data, selectedProject.id, setSelectedProject],
  );

  const archiveProject = useCallback(
    async (project: IProject) => {
      try {
        await api.patch(`projects/${project.id}/archive`);

        if (selectedProject.id === project.id) {
          setSelectedProject({} as IProject);
        }

        const index = data.findIndex((s) => s.id === project.id);

        setData((state) => {
          return produce(state, (draft) => {
            // eslint-disable-next-line no-param-reassign
            draft = draft.splice(index, 1);
          });
        });
      } catch (err) {
        // if (err.response) {
        //   throw new Error(err.response.data.error);
        // }

        // if (err.request) {
        //   throw new Error(err.request);
        // }

        throw new Error('Internal error: archiveProject on useProjects');
      }
    },
    [data, selectedProject.id, setSelectedProject],
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects: data,
        errorProject: error,
        fetchProjects,
        setSelectedProject,
        selectedProject,
        storeProject,
        updateProject,
        removeProject,
        archiveProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

function useProjects(): IProjectsContextData {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be within an ProjectsProvider');
  }

  return context;
}

export { ProjectsProvider, useProjects };
