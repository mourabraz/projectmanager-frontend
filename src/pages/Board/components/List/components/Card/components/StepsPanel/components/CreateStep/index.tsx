import React, { useCallback, useRef, useState } from 'react';
import { FiX, FiEdit2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { ITask } from '../../../../../../../../../../interfaces';

import getValidationErrors from '../../../../../../../../../../utils/getValidationErrors';

import { useSteps } from '../../../../../../../../../../hooks/steps';
import Input from '../../../../../../../../../../components/Input';
import Button from '../../../../../../../../../../components/Button';

import { Colors } from '../../../../../../../../../../styles/colors';
import { Container, Content } from './styles';
import Loading from '../../../../../../../../../../components/Loading';

interface ICreateStepProps {
  task: ITask;
  onClose: () => void;
}

interface ICreateStepTaskFormData {
  title: string;
}

const CreateStep: React.FC<ICreateStepProps> = ({ task, onClose }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { storeStep } = useSteps();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: ICreateStepTaskFormData) => {
      try {
        setSaving(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('This field is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await storeStep({
          taskId: task.id,
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
          'Opps! Something goes wrong... It could not save the step.',
        );
      }
    },
    [handleCloseButton, storeStep, task.id],
  );

  return (
    <Container>
      <header>
        <p>
          Create Step in task
          {` ${task.title}`}
        </p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form
          ref={fromRef}
          onSubmit={handleSubmit}
          initialData={{ title: '', description: '' }}
        >
          <Input
            autoFocus
            name="title"
            type="text"
            icon={FiEdit2}
            placeholder="Title"
          />
          <Button type="submit" kind="info" disabled={saving}>
            Save
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateStep;
