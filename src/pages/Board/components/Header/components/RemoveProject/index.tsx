import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { FiXCircle } from 'react-icons/fi';

import { useProjects } from '../../../../../../hooks/projects';
import Button from '../../../../../../components/Button';
import Loading from '../../../../../../components/Loading';

import { Colors } from '../../../../../../styles/colors';
import { Container, Content } from './styles';

interface IRemoveProjectProps {
  onClose: () => void;
}

const RemoveProject: React.FC<IRemoveProjectProps> = ({ onClose }) => {
  const [removing, setRemoving] = useState<boolean>(false);

  const { removeProject, selectedProject } = useProjects();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleRemoveProject = useCallback(async () => {
    try {
      setRemoving(true);

      await removeProject(selectedProject);

      handleCloseButton();
    } catch (error) {
      setRemoving(false);

      toast.error(
        'Opps! Something goes wrong... It could not remove the project.',
      );
    }
  }, [removeProject, selectedProject, handleCloseButton]);

  return (
    <Container>
      <header>
        <FiXCircle color={Colors.error} size={50} />
        <h2>Are you sure? Do you really want to remove this project?</h2>

        <hr />

        <p>{`${selectedProject.name}`}</p>
      </header>

      <Content>
        {removing && <Loading color={Colors.primary} />}
        <Button
          type="button"
          kind="error"
          disabled={removing}
          onClick={handleRemoveProject}
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

export default RemoveProject;
