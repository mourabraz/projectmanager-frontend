import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX, FiEdit2 } from 'react-icons/fi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../../../../utils/getValidationErrors';

import Button from '../../../../../../components/Button';
import Input from '../../../../../../components/Input';

import { Colors } from '../../../../../../styles/colors';
import { Container, Content } from './styles';
import { useProjects } from '../../../../../../hooks/projects';
import Loading from '../../../../../../components/Loading';

interface IEditProjectFormProps {
  onClose: () => void;
}

interface IEditProjectFormData {
  name: string;
}

const EditProjectForm: React.FC<IEditProjectFormProps> = ({ onClose }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { updateProject, selectedProject } = useProjects();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: IEditProjectFormData) => {
      try {
        setSaving(true);
        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await updateProject({ id: selectedProject.id, name: data.name });

        handleCloseButton();
      } catch (error) {
        setSaving(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          `Opps! Something goes wrong... It could not update project with name: ${data.name}.`,
        );
      }
    },
    [handleCloseButton, selectedProject.id, updateProject],
  );

  return (
    <Container>
      <header>
        <p>Update Project</p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form
          ref={fromRef}
          initialData={{ name: selectedProject.name }}
          onSubmit={handleSubmit}
        >
          <Input
            name="name"
            type="text"
            icon={FiEdit2}
            placeholder="Project Name"
          />
          <Button type="submit" kind="info" disabled={saving}>
            Update
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default EditProjectForm;
