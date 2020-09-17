/* eslint-disable import/no-duplicates */
import React, { useCallback, useRef, useState } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import getValidationErrors from '../../../../../../../../utils/getValidationErrors';

import { useTasks } from '../../../../../../../../hooks/tasks';
import Button from '../../../../../../../../components/Button';
import DatePicker from '../../../../../../../../components/DatePicker';
import Loading from '../../../../../../../../components/Loading';

import { ITask } from '../../../../../../../../interfaces';

import { Colors } from '../../../../../../../../styles/colors';
import { Container, Content, DatePickerBox } from './styles';

interface IEditStartedProps {
  onClose: () => void;
  task: ITask;
}

interface IEditStartedTaskFormData {
  startedAt: Date;
}

const EditStarted: React.FC<IEditStartedProps> = ({ onClose, task }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { updateTask } = useTasks();

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: IEditStartedTaskFormData) => {
      try {
        setSaving(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          startedAt: Yup.string().nullable(),
        });

        await schema.validate(data, { abortEarly: false });

        await updateTask({
          task,
          startedAt: data.startedAt ? data.startedAt : 'null',
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
          "Opps! Something goes wrong... It could not update the task's start.",
        );
      }
    },
    [handleCloseButton, task, updateTask],
  );

  return (
    <Container>
      <header>
        <p>
          Edit Start to task with title
          {` ${task.title}`}
        </p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form
          ref={fromRef}
          initialData={{
            startedAt: task.startedAt ? parseISO(task.startedAt) : null,
          }}
          onSubmit={handleSubmit}
        >
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
          </DatePickerBox>
          <Button type="submit" kind="info" disabled={saving}>
            Save
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default EditStarted;
