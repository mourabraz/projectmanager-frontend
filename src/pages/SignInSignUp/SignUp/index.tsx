import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content } from './styles';

interface ISignUpProps {
  setSignUpLoading(flag: boolean): void;
  setSignInLoading(flag: boolean): void;
}

interface ISignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC<ISignUpProps> = ({
  setSignUpLoading,
  setSignInLoading,
}) => {
  const fromRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try {
        setSignUpLoading(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Email is not valid')
            .required('Email is required'),
          password: Yup.string().min(
            8,
            'Password must have at least 8 characters',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('auth/signup', data);

        toast.success('Success to sign up. You are ready to sign in.');

        setSignUpLoading(false);

        setSignInLoading(true);

        await signIn({ email: data.email, password: data.password });

        // setSignInLoading(false);

        history.push('/');
      } catch (error) {
        setSignUpLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error('Sign up fails. Could not sign up to the application!');
      }
    },
    [history, setSignInLoading, setSignUpLoading, signIn],
  );

  return (
    <Container>
      <Content>
        <Form ref={fromRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} type="text" placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" kind="info">
            SIGN UP
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
