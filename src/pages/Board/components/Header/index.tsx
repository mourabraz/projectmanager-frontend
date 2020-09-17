import React, { useEffect, useState, useCallback } from 'react';

import { FiPlusCircle, FiEdit3, FiTrash2, FiArchive } from 'react-icons/fi';
import { IProject, IParticipant } from '../../../../interfaces';

import { useAuth } from '../../../../hooks/auth';
import { useProjects } from '../../../../hooks/projects';

import Modal from '../../../../components/Modal';
import Combobox from '../../../../components/Combobox';
import InviteForm from './components/InviteForm';
import CreateProjectForm from './components/CreateProjectForm';
import EditProjectForm from './components/EditProjectForm';
import RemoveProject from './components/RemoveProject';
import ArchiveProject from './components/ArchiveProject';

import { Colors } from '../../../../styles/colors';
import {
  Container,
  AddProjectButton,
  EditProjectButton,
  RemoveProjectButton,
  ArchivedProjectButton,
  InviteButton,
  ParticipantsList,
  Participant,
} from './styles';

interface IListItem {
  title: string;
  key: string;
  selected: boolean;
}

const Header: React.FC = () => {
  const { user } = useAuth();
  const {
    fetchProjects,
    projects,
    setSelectedProject,
    selectedProject,
  } = useProjects();

  const [list, setList] = useState<IListItem[]>([]);
  const [participantsList, setParticipantsList] = useState<IParticipant[]>([]);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [showInviteFormModal, setShowInviteFormModal] = useState<boolean>(
    false,
  );
  const [showCreateProjectFormModal, setShowCreateProjectFormModal] = useState<
    boolean
  >(false);
  const [showEditProjectFormModal, setShowEditProjectFormModal] = useState<
    boolean
  >(false);
  const [showRemoveProjectModal, setShowRemoveProjectModal] = useState<boolean>(
    false,
  );
  const [showArchiveProjectModal, setShowArchiveProjectModal] = useState<
    boolean
  >(false);

  useEffect(() => {
    async function load(): Promise<void> {
      setListLoading(true);
      await fetchProjects();
      setListLoading(false);
    }

    load();
  }, [fetchProjects]);

  useEffect(() => {
    setList(
      projects.map((item) => ({
        title: item.name,
        key: item.id,
        selected: selectedProject.name
          ? selectedProject.name === item.name
          : false,
      })),
    );
  }, [projects, selectedProject.name]);

  useEffect(() => {
    if (selectedProject && selectedProject.participants) {
      setParticipantsList(
        selectedProject.participants.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          avatar: item.avatar,
        })),
      );
    }
  }, [selectedProject]);

  const getSelectProject = useCallback(
    (name: string) => {
      const temp = projects.filter((p) => p.name === name);
      let project = {} as IProject;
      if (temp.length) {
        project = { ...temp[0] };
      }
      setSelectedProject(project);
    },
    [projects, setSelectedProject],
  );

  return (
    <>
      <Modal visible={showInviteFormModal}>
        <InviteForm
          project={selectedProject}
          onClose={(): void => setShowInviteFormModal(false)}
        />
      </Modal>
      <Modal visible={showCreateProjectFormModal}>
        <CreateProjectForm
          onClose={(): void => setShowCreateProjectFormModal(false)}
        />
      </Modal>
      <Modal visible={showEditProjectFormModal}>
        <EditProjectForm
          onClose={(): void => setShowEditProjectFormModal(false)}
        />
      </Modal>
      <Modal visible={showRemoveProjectModal}>
        <RemoveProject onClose={(): void => setShowRemoveProjectModal(false)} />
      </Modal>
      <Modal visible={showArchiveProjectModal}>
        <ArchiveProject
          onClose={(): void => setShowArchiveProjectModal(false)}
        />
      </Modal>
      <Container>
        <Combobox
          title={selectedProject.name || ''}
          list={list}
          onSelected={getSelectProject}
          loading={listLoading}
        />

        <AddProjectButton
          type="button"
          kind="default"
          onClick={(): void => setShowCreateProjectFormModal(true)}
        >
          <FiPlusCircle color={Colors.primary} size={20} />
        </AddProjectButton>

        {selectedProject.id && selectedProject.owner?.id === user.id && (
          <EditProjectButton
            type="button"
            kind="info"
            onClick={(): void => setShowEditProjectFormModal(true)}
          >
            <FiEdit3 color={Colors.primary} size={14} />
          </EditProjectButton>
        )}

        {selectedProject.id && selectedProject.owner?.id === user.id && (
          <ArchivedProjectButton
            type="button"
            kind="warn"
            onClick={(): void => setShowArchiveProjectModal(true)}
          >
            <FiArchive color={Colors.primary} size={12} />
          </ArchivedProjectButton>
        )}

        {selectedProject.id && selectedProject.owner?.id === user.id && (
          <RemoveProjectButton
            type="button"
            kind="error"
            onClick={(): void => setShowRemoveProjectModal(true)}
          >
            <FiTrash2 color={Colors.primary} size={12} />
          </RemoveProjectButton>
        )}

        {selectedProject.id && (
          <>
            {selectedProject.owner?.id === user.id && (
              <InviteButton
                type="button"
                kind="default"
                onClick={(): void => setShowInviteFormModal(true)}
              >
                Invite
              </InviteButton>
            )}
            <ParticipantsList>
              {participantsList.map((item) => (
                <Participant
                  key={item.id}
                  isOwner={item.id === selectedProject.owner?.id}
                >
                  <img
                    width="40px"
                    height="40px"
                    src={
                      item.avatar
                        ? `${item.avatar.url}/thumbnail`
                        : `https://api.adorable.io/avatars/285/${item.email}.png`
                    }
                    alt="Participant avatar"
                  />
                </Participant>
              ))}
            </ParticipantsList>
          </>
        )}
      </Container>
    </>
  );
};

export default Header;
