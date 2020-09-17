import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX, FiEdit2 } from 'react-icons/fi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../../../../utils/getValidationErrors';

import { IProject } from '../../../../../../interfaces';

import Button from '../../../../../../components/Button';
import Input from '../../../../../../components/Input';
import Loading from '../../../../../../components/Loading';

import { Colors } from '../../../../../../styles/colors';
import { Container, Content } from './styles';
import api from '../../../../../../services/api';

interface IInviteFormProps {
  onClose: () => void;
  project: IProject;
}

interface IInviteFormData {
  email: string;
}

const InviteForm: React.FC<IInviteFormProps> = ({ onClose, project }) => {
  const fromRef = useRef<FormHandles>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (data: IInviteFormData) => {
      try {
        setSaving(true);
        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`projects/${project.id}/invitations`, {
          emailTo: data.email,
        });

        toast.success(`Invitation sended to ${data.email}.`);

        handleCloseButton();
      } catch (error) {
        setSaving(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          `Opps! Something goes wrong... It could not send invitation to ${data.email}.`,
        );
      }
    },
    [handleCloseButton, project.id],
  );

  return (
    <Container>
      <header>
        <p>Invite by email</p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form ref={fromRef} initialData={{ email: '' }} onSubmit={handleSubmit}>
          <Input name="email" type="email" icon={FiEdit2} placeholder="Email" />
          <Button type="submit" kind="info" disabled={saving}>
            Send
            {saving && <Loading color={Colors.primary} />}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default InviteForm;
