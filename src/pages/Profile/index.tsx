import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PhotoEdit from './components/PhotoEdit';

import { Container, Content, AlertaDanger } from './style';

interface IProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);

  const [isDataDirty, setIsDataDirty] = useState(false);

  const { user, signOut, updateName } = useAuth();

  const formDataChange = useCallback(() => {
    if (fromRef.current) {
      const formData: IProfileFormData = fromRef.current.getData() as IProfileFormData;
      setIsDataDirty(
        formData.name !== user.name || formData.email !== user.email,
      );
    }
  }, [user.email, user.name]);

  const handleSubmit = useCallback(
    async (data: IProfileFormData) => {
      try {
        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string().email('Email is not valid'),
          oldPassword: Yup.string(),
          password: Yup.string().when(
            'oldPassword',
            (oldPassword: string, field: any) =>
              oldPassword
                ? field
                    .min(8, 'Password must have at least 8 characters')
                    .required('Must fill new password when password is present')
                : field,
          ),
          confirmPassword: Yup.string().when(
            'password',
            (password: string, field: any) =>
              password
                ? field
                    .required('Password must be confirmed')
                    .oneOf([Yup.ref('password')], 'Password does not match!')
                : field,
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put('users', {
          name: data.name || user.name,
          email: data.email || user.email,
          ...(data.oldPassword ? { password: data.password } : {}),
        });

        if (data.oldPassword || data.email !== user.email) {
          toast.success(
            'Success. You profile is updated. When you update your email/password you must sing in again.',
          );
          signOut();
        } else {
          updateName(data.name);
          toast.success('Success. You profile is updated.');
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error('Updated fails. Could not updatde user profile!');
      }
    },
    [signOut, updateName, user.email, user.name],
  );

  return (
    <Container>
      <Content>
        <PhotoEdit />

        <Form
          ref={fromRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <Input
            name="name"
            icon={FiUser}
            type="text"
            placeholder="Name"
            onChange={formDataChange}
          />
          <Input
            name="email"
            icon={FiMail}
            type="text"
            placeholder="Email"
            onChange={formDataChange}
          />
          <Input
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="New Password"
          />
          <Input
            name="confirmPassword"
            icon={FiLock}
            type="password"
            placeholder="Confirm Password"
          />
          <Button type="submit" kind="info" disabled={!isDataDirty}>
            Update
          </Button>
        </Form>
      </Content>
      <AlertaDanger>
        <p>
          This account cannot be updated! For demonstrations purpose you must
          create a new one.
        </p>
      </AlertaDanger>
    </Container>
  );
};

export default Profile;
