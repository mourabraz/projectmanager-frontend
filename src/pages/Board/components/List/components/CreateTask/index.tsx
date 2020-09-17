import React, { useCallback, useRef, useState } from 'react';
import { FiX, FiEdit2, FiCalendar } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import pt from 'date-fns/locale/pt';

import getValidationErrors from '../../../../../../utils/getValidationErrors';

import { useProjects } from '../../../../../../hooks/projects';
import { useTasks } from '../../../../../../hooks/tasks';
import Input from '../../../../../../components/Input';
import Button from '../../../../../../components/Button';
import DraftInput from '../../../../../../components/DraftInput';
import DatePicker from '../../../../../../components/DatePicker';
import Loading from '../../../../../../components/Loading';

import { Colors } from '../../../../../../styles/colors';
import { Container, Content, DatePickerBox } from './styles';

interface ICreateTaskProps {
  onClose: () => void;
}

interface ICreateTaskTaskFormData {
  title: string;
  description: string;
  deadlineAt: Date;
  startedAt: Date;
}

const CreateTask: React.FC<ICreateTaskProps> = ({ onClose }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { selectedProject } = useProjects();
  const { storeTask } = useTasks();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: ICreateTaskTaskFormData) => {
      try {
        setSaving(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is required'),
          description: Yup.string(),
          deadlineAt: Yup.string().nullable(),
          startedAt: Yup.string().nullable(),
        });

        await schema.validate(data, { abortEarly: false });

        await storeTask({
          projectId: selectedProject.id,
          title: data.title,
          description: data.description,
          deadlineAt: data.deadlineAt,
          startedAt: data.startedAt,
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
          'Opps! Something goes wrong... It could not save the task.',
        );
      }
    },
    [handleCloseButton, selectedProject.id, storeTask],
  );

  return (
    <Container>
      <header>
        <p>
          Create a new Task for project
          {` ${selectedProject.name}`}
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
            name="title"
            type="text"
            icon={FiEdit2}
            placeholder="Title"
            autoFocus
          />

          <DatePickerBox>
            <DatePicker
              name="startedAt"
              icon={FiCalendar}
              placeholderText="Start at"
              dateFormat="dd/MM/yyyy HH:mm"
              minDate={new Date()}
              locale={pt}
              showTimeSelect
              // timeFormat="p"
              timeIntervals={30}
              showPopperArrow={false}
            />

            <DatePicker
              name="deadlineAt"
              icon={FiCalendar}
              placeholderText="Deadline at"
              dateFormat="dd/MM/yyyy HH:mm"
              minDate={new Date()}
              locale={pt}
              showTimeSelect
              // timeFormat="p"
              timeIntervals={30}
              showPopperArrow={false}
            />
          </DatePickerBox>

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

export default CreateTask;
