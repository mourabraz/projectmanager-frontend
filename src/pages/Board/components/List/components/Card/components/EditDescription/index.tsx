import React, { useCallback, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../../../../../../utils/getValidationErrors';

import { useTasks } from '../../../../../../../../hooks/tasks';
import Button from '../../../../../../../../components/Button';
import DraftInput from '../../../../../../../../components/DraftInput';

import { ITask } from '../../../../../../../../interfaces';

import { Colors } from '../../../../../../../../styles/colors';
import { Container, Content } from './styles';
import Loading from '../../../../../../../../components/Loading';

interface IEditDescriptionProps {
  onClose: () => void;
  task: ITask;
}

interface IEditDescriptionTaskFormData {
  description: string;
}

const EditDescription: React.FC<IEditDescriptionProps> = ({
  onClose,
  task,
}) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { updateTask } = useTasks();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: IEditDescriptionTaskFormData) => {
      try {
        setSaving(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        await updateTask({
          task,
          description: data.description,
        });

        handleCloseButton();
      } catch (error) {
        setSaving(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          "Opps! Something goes wrong... It could not update the task's description.",
        );
      }
    },
    [handleCloseButton, task, updateTask],
  );

  return (
    <Container>
      <header>
        <p>
          Edit Task
          {` ${task.title}`}
        </p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form
          ref={fromRef}
          initialData={{ description: task.description }}
          onSubmit={handleSubmit}
        >
          <DraftInput name="description" />
          <Button type="submit" kind="info" disabled={saving}>
            Save
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default EditDescription;
