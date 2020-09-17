import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { FiAlertTriangle } from 'react-icons/fi';

import { useProjects } from '../../../../../../hooks/projects';
import Button from '../../../../../../components/Button';
import Loading from '../../../../../../components/Loading';

import { Colors } from '../../../../../../styles/colors';
import { Container, Content } from './styles';

interface IArchiveProjectProps {
  onClose: () => void;
}

const ArchiveProject: React.FC<IArchiveProjectProps> = ({ onClose }) => {
  const [archiving, setArchiving] = useState<boolean>(false);

  const { archiveProject, selectedProject } = useProjects();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleArchiveProject = useCallback(async () => {
    try {
      setArchiving(true);

      await archiveProject(selectedProject);

      handleCloseButton();
    } catch (error) {
      setArchiving(false);

      toast.error(
        'Opps! Something goes wrong... It could not archive the project.',
      );
    }
  }, [archiveProject, selectedProject, handleCloseButton]);

  return (
    <Container>
      <header>
        <FiAlertTriangle color={Colors.warn} size={50} />
        <h2>Are you sure? Do you really want to archive this project?</h2>

        <hr />

        <p>{`${selectedProject.name}`}</p>
      </header>

      <Content>
        {archiving && <Loading color={Colors.primary} />}
        <Button
          type="button"
          kind="warn"
          disabled={archiving}
          onClick={handleArchiveProject}
        >
          Archive
        </Button>
        <Button
          type="button"
          kind="default"
          disabled={archiving}
          onClick={handleCloseButton}
        >
          Cancel
        </Button>
      </Content>
    </Container>
  );
};

export default ArchiveProject;
