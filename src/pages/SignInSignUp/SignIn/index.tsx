import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import getValidationErrors from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content } from './styles';

interface ISignInProps {
  setSignInLoading(flag: boolean): void;
}

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC<ISignInProps> = ({ setSignInLoading }) => {
  const fromRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        setSignInLoading(true);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Email is not valid')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });

        history.push('/');
      } catch (error) {
        setSignInLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error('Sign up fails. Could not sign in to the application!');
      }
    },
    [setSignInLoading, signIn, history],
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
            SIGN IN
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
