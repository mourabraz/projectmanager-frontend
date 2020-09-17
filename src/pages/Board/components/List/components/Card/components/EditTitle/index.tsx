import React, { useCallback, useRef, useState } from 'react';
import { FiX, FiEdit2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../../../../../../utils/getValidationErrors';

import { useTasks } from '../../../../../../../../hooks/tasks';
import Input from '../../../../../../../../components/Input';
import Button from '../../../../../../../../components/Button';

import { ITask } from '../../../../../../../../interfaces';

import { Colors } from '../../../../../../../../styles/colors';
import { Container, Content } from './styles';
import Loading from '../../../../../../../../components/Loading';

interface IEditTitleProps {
  onClose: () => void;
  task: ITask;
}

interface IEditTitleTaskFormData {
  title: string;
}

const EditTitle: React.FC<IEditTitleProps> = ({ onClose, task }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { updateTask } = useTasks();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: IEditTitleTaskFormData) => {
      try {
        setSaving(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Ttile is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await updateTask({
          task,
          title: data.title,
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
          "Opps! Something goes wrong...It could not update the task's title.",
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
          {task.title}
        </p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form
          ref={fromRef}
          initialData={{ title: task.title }}
          onSubmit={handleSubmit}
        >
          <Input name="title" type="text" icon={FiEdit2} placeholder="Title" />
          <Button type="submit" kind="info" disabled={saving}>
            Save
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default EditTitle;
